import { Injectable } from '@nestjs/common';
import { UATReport } from '../../uat-reports/models/uat-report';
import { AttributeType } from '../../scoring-rules/enums/attribute-type.enum';
import { ReportType } from '../../uat-reports/enums/report-type.enum';

export interface EvaluationPrompt {
  systemPrompt: string;
  userPrompt: string;
}

@Injectable()
export class PromptBuilderService {
  buildPrompt(
    attribute: AttributeType,
    report: UATReport,
    reportType: ReportType,
  ): EvaluationPrompt {
    const systemPrompt = this.getSystemPrompt(attribute, reportType);
    const userPrompt = this.getUserPrompt(attribute, report, reportType);

    return {
      systemPrompt,
      userPrompt,
    };
  }

  private getSystemPrompt(
    attribute: AttributeType,
    reportType: ReportType,
  ): string {
    const reportTypeLabel =
      reportType === ReportType.BUG_REPORT ? 'Laporan Bug' : 'Laporan Sukses';

    // Special handling for Steps to Reproduce
    if (attribute === AttributeType.STEPS_TO_REPRODUCE) {
      return `Anda adalah evaluator quality assurance ahli yang mengkhususkan diri dalam mengevaluasi kemampuan reproduksi test case. Tugas Anda adalah mengevaluasi Langkah-langkah untuk Reproduksi untuk ${reportTypeLabel.toLowerCase()} dan memberikan penilaian semantik.

Anda HARUS merespons HANYA dengan JSON yang valid dalam format ini:
{"score": 0.0-1.0, "status": "VALID|AMBIGUOUS|INVALID", "reasoning": "penjelasan singkat", "issues": ["daftar masalah jika ada"]}

Pemetaan Status:
- VALID: score >= 0.7 - Langkah-langkah tersusun secara logis, dapat direproduksi, dan lengkap
- AMBIGUOUS: 0.4 <= score < 0.7 - Langkah-langkah memiliki beberapa masalah tetapi mungkin masih bisa digunakan
- INVALID: score < 0.4 - Langkah-langkah tidak jelas, tidak logis, atau tidak lengkap

Skor harus mencerminkan kualitas semantik, bukan jumlah karakter. Evaluasi berdasarkan:
- Urutan dan logika langkah
- Hubungan sebab-akibat antar langkah
- Kemampuan reproduksi oleh tester lain
- Kelengkapan untuk reproduksi bug

Bersikap ketat tetapi adil dalam evaluasi Anda.`;
    }

    // Special handling for Actual Result
    if (attribute === AttributeType.ACTUAL_RESULT) {
      return `Anda adalah evaluator quality assurance ahli yang mengkhususkan diri dalam mengevaluasi deskripsi laporan bug. Tugas Anda adalah mengevaluasi deskripsi Hasil Aktual untuk ${reportTypeLabel.toLowerCase()} dan memberikan penilaian semantik.

Anda HARUS merespons HANYA dengan JSON yang valid dalam format ini:
{"score": 0.0-1.0, "reasoning": "penjelasan singkat", "qualityFlags": {"isConsistent": true/false, "isClear": true/false, "isContradictory": false/true, "isTooGeneric": false/true, "hasBias": false/true, "isAmbiguous": false/true}}

Skor harus mencerminkan kualitas semantik, bukan jumlah karakter. Evaluasi berdasarkan:
- Konsistensi dengan judul laporan
- Kejelasan deskripsi perilaku sistem
- Tidak ada kontradiksi
- Spesifisitas (tidak terlalu umum)
- Kelengkapan informasi

Bersikap ketat tetapi adil dalam evaluasi Anda.`;
    }

    // Default system prompt for other attributes
    return `Anda adalah evaluator quality assurance ahli. Tugas Anda adalah mengevaluasi atribut ${reportTypeLabel.toLowerCase()} dan memberikan skor dari 0.0 hingga 1.0.

Anda HARUS merespons HANYA dengan JSON yang valid dalam format ini:
{"score": 0.0-1.0, "reasoning": "penjelasan singkat dari evaluasi Anda"}

Skor harus mencerminkan:
- 0.0-0.3: Kualitas buruk, informasi kritis hilang
- 0.4-0.6: Dapat diterima tetapi tidak lengkap atau tidak jelas
- 0.7-0.9: Kualitas baik dengan masalah minor
- 1.0: Kualitas sangat baik, lengkap dan jelas

Bersikap ketat tetapi adil dalam evaluasi Anda.`;
  }

  private getUserPrompt(
    attribute: AttributeType,
    report: UATReport,
    reportType: ReportType,
  ): string {
    const reportTypeLabel =
      reportType === ReportType.BUG_REPORT ? 'Laporan Bug' : 'Laporan Sukses';

    switch (attribute) {
      case AttributeType.TEST_ENVIRONMENT:
        return this.buildTestEnvironmentPrompt(report, reportTypeLabel);
      case AttributeType.STEPS_TO_REPRODUCE:
        return this.buildStepsToReproducePrompt(report, reportTypeLabel);
      case AttributeType.ACTUAL_RESULT:
        return this.buildActualResultPrompt(report, reportTypeLabel);
      case AttributeType.EXPECTED_RESULT:
        return this.buildExpectedResultPrompt(report, reportTypeLabel);
      case AttributeType.SUPPORTING_EVIDENCE:
        return this.buildSupportingEvidencePrompt(report, reportTypeLabel);
      case AttributeType.SEVERITY_LEVEL:
        return this.buildSeverityLevelPrompt(report, reportTypeLabel);
      case AttributeType.INFORMATION_CONSISTENCY:
        return this.buildInformationConsistencyPrompt(report, reportTypeLabel);
      case AttributeType.TEST_IDENTITY:
        return this.buildTestIdentityPrompt(report, reportTypeLabel);
      default:
        return this.buildGenericPrompt(attribute, report, reportTypeLabel);
    }
  }

  private buildTestEnvironmentPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const env = report.testEnvironment;
    return `Evaluasi atribut Lingkungan Uji untuk ${reportTypeLabel.toLowerCase()} ini:

Data Lingkungan Uji:
- Sistem Operasi: ${env?.os || 'Tidak disediakan'}
- Browser: ${env?.browser || 'Tidak disediakan'}
- Perangkat: ${env?.device || 'Tidak disediakan'}
- Informasi Tambahan: ${env?.additionalInfo || 'Tidak ada'}

Kriteria Penilaian:
- Semua field wajib (OS, Browser, Perangkat) disediakan: +0.5
- Informasi tambahan yang relevan disediakan: +0.3
- Informasi jelas dan spesifik: +0.2

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }

  private buildStepsToReproducePrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const steps = report.stepsToReproduce || [];
    const stepsText =
      steps.length > 0
        ? steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
        : 'Tidak ada langkah yang disediakan';

    const title = report.testIdentity?.title || 'N/A';
    const actualResult = report.actualResult || 'N/A';
    const expectedResult = report.expectedResult || 'N/A';

    return `Evaluasi atribut Langkah-langkah untuk Reproduksi untuk ${reportTypeLabel.toLowerCase()} ini:

Judul Laporan: ${title}

Langkah-langkah untuk Reproduksi:
${stepsText}

Konteks:
- Hasil Aktual: ${actualResult.substring(0, 200)}${actualResult.length > 200 ? '...' : ''}
- Hasil yang Diharapkan: ${expectedResult.substring(0, 200)}${expectedResult.length > 200 ? '...' : ''}

Kriteria Evaluasi Semantik:
1. Validitas Urutan (0.3 poin):
   - Apakah langkah-langkah dalam urutan yang logis?
   - Apakah mereka mengikuti progresi alami?
   - Apakah ada awal dan akhir yang jelas?

2. Hubungan Sebab-Akibat (0.3 poin):
   - Apakah langkah-langkah saling membangun?
   - Apakah ada rantai sebab-akibat yang jelas?
   - Apakah dependensi antar langkah eksplisit?

3. Kemampuan Reproduksi (0.2 poin):
   - Dapatkah tester lain mengikuti langkah-langkah ini?
   - Apakah tindakan spesifik dan tidak ambigu?
   - Apakah semua detail yang diperlukan disertakan?

4. Kelengkapan (0.2 poin):
   - Apakah semua langkah yang diperlukan untuk mereproduksi masalah ada?
   - Apakah tidak ada yang kritis yang hilang?
   - Apakah mengikuti langkah-langkah ini akan secara andal mereproduksi bug?

Kembalikan JSON: {"score": 0.0-1.0, "status": "VALID|AMBIGUOUS|INVALID", "reasoning": "penjelasan detail", "issues": ["daftar masalah spesifik yang ditemukan"]}`;
  }

  private buildActualResultPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const actualResult = report.actualResult || 'Not provided';
    const isSuccessReport = report.reportType === ReportType.SUCCESS_REPORT;
    const title = report.testIdentity?.title || 'N/A';
    const expectedResult = report.expectedResult || 'N/A';

    if (isSuccessReport) {
      return `Evaluasi atribut Deskripsi Sukses (Hasil Aktual) untuk laporan sukses ini:

Judul Laporan: ${title}

Deskripsi Sukses:
${actualResult}

Hasil yang Diharapkan (untuk konteks):
${expectedResult}

Kriteria Evaluasi Semantik:
1. Konsistensi dengan Judul (0.2 poin):
   - Apakah deskripsi konsisten dengan judul laporan?
   - Apakah sesuai dengan yang disarankan oleh judul?

2. Kejelasan Perilaku Sukses (0.3 poin):
   - Apakah jelas apa yang berhasil?
   - Apakah perilaku sukses dijelaskan secara detail?
   - Dapatkah pembaca memahami apa yang berfungsi?

3. Tidak Kontradiktif (0.2 poin):
   - Apakah ada kontradiksi dalam deskripsi?
   - Apakah informasi koheren?

4. Spesifisitas (0.2 poin):
   - Apakah deskripsi cukup spesifik?
   - Tidak terlalu umum atau samar?
   - Menyertakan detail yang relevan?

5. Kelengkapan (0.1 poin):
   - Apakah semua informasi yang diperlukan disertakan?
   - Dapatkah seseorang memahami kesuksesan tanpa konteks tambahan?

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan detail", "qualityFlags": {"isConsistent": true/false, "isClear": true/false, "isContradictory": false/true, "isTooGeneric": false/true, "hasBias": false/true, "isAmbiguous": false/true}}`;
    }

    return `Evaluasi atribut Hasil Aktual untuk laporan bug ini:

Judul Laporan: ${title}

Hasil Aktual:
${actualResult}

Hasil yang Diharapkan (untuk perbandingan):
${expectedResult}

Kriteria Evaluasi Semantik:
1. Konsistensi dengan Judul (0.2 poin):
   - Apakah hasil aktual konsisten dengan judul laporan?
   - Apakah menggambarkan masalah yang disebutkan dalam judul?

2. Kejelasan Perilaku Sistem (0.3 poin):
   - Apakah jelas apa yang sebenarnya terjadi?
   - Apakah perilaku sistem dijelaskan dengan jelas?
   - Dapatkah pembaca memahami masalahnya?

3. Tidak Kontradiktif (0.2 poin):
   - Apakah ada kontradiksi dalam deskripsi?
   - Apakah informasi koheren dan logis?

4. Spesifisitas (0.2 poin):
   - Apakah deskripsi cukup spesifik?
   - Tidak terlalu umum atau samar?
   - Menyertakan pesan error, gejala, atau detail yang relevan?

5. Kelengkapan (0.1 poin):
   - Apakah semua informasi yang diperlukan disertakan?
   - Dapatkah seseorang memahami masalah tanpa konteks tambahan?

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan detail", "qualityFlags": {"isConsistent": true/false, "isClear": true/false, "isContradictory": false/true, "isTooGeneric": false/true, "hasBias": false/true, "isAmbiguous": false/true}}`;
  }

  private buildExpectedResultPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const expectedResult = report.expectedResult || 'Tidak disediakan';
    return `Evaluasi atribut Hasil yang Diharapkan untuk ${reportTypeLabel.toLowerCase()} ini:

Hasil yang Diharapkan:
${expectedResult}

Kriteria Penilaian:
- Hasil yang diharapkan disediakan dan bermakna (minimal 10 karakter): +0.4
- Jelas menggambarkan apa yang seharusnya terjadi: +0.3
- Kontras dengan tepat terhadap hasil aktual: +0.2
- Deskripsi jelas dan spesifik: +0.1

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }

  private buildSupportingEvidencePrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const evidence = report.supportingEvidence || [];
    const evidenceText =
      evidence.length > 0
        ? evidence
            .map(
              (e, i) =>
                `${i + 1}. Tipe: ${e.type}, URL: ${e.url || 'N/A'}, Deskripsi: ${e.description || 'Tidak ada'}`,
            )
            .join('\n')
        : 'Tidak ada bukti pendukung yang disediakan';

    return `Evaluasi atribut Bukti Pendukung untuk ${reportTypeLabel.toLowerCase()} ini:

Bukti Pendukung:
${evidenceText}

Kriteria Penilaian:
- Setidaknya satu bukti disediakan: +0.5
- Bukti relevan dengan laporan: +0.3
- Bukti menyertakan deskripsi atau konteks yang tepat: +0.2

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }

  private buildSeverityLevelPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const severity = report.severityLevel;
    const actualResult = report.actualResult || '';
    const expectedResult = report.expectedResult || '';

    return `Evaluasi atribut Tingkat Keparahan untuk ${reportTypeLabel.toLowerCase()} ini:

Tingkat Keparahan: ${severity}

Hasil Aktual: ${actualResult.substring(0, 200)}
Hasil yang Diharapkan: ${expectedResult.substring(0, 200)}

Kriteria Penilaian:
- Tingkat keparahan sesuai dengan masalah yang dijelaskan: +0.5
- Keparahan sesuai dengan dampak yang dijelaskan dalam hasil aktual/diharapkan: +0.3
- Tingkat keparahan ditetapkan dengan benar (Critical untuk crash, High untuk masalah besar, dll.): +0.2

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }

  private buildInformationConsistencyPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const actualResult = report.actualResult || '';
    const expectedResult = report.expectedResult || '';
    const severity = report.severityLevel;
    const steps = report.stepsToReproduce || [];

    return `Evaluasi atribut Konsistensi Informasi untuk ${reportTypeLabel.toLowerCase()} ini:

Hasil Aktual: ${actualResult.substring(0, 200)}
Hasil yang Diharapkan: ${expectedResult.substring(0, 200)}
Tingkat Keparahan: ${severity}
Langkah-langkah untuk Reproduksi: ${steps.length} langkah disediakan

Kriteria Penilaian:
- Hasil aktual dan yang diharapkan berbeda (seperti yang seharusnya untuk laporan bug): +0.3
- Baik hasil aktual maupun yang diharapkan bermakna (minimal 10 karakter masing-masing): +0.2
- Tingkat keparahan konsisten dengan masalah yang dijelaskan: +0.2
- Langkah-langkah untuk reproduksi selaras dengan masalah yang dijelaskan: +0.2
- Secara keseluruhan informasi koheren dan konsisten: +0.1

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }

  private buildTestIdentityPrompt(
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    const testIdentity = report.testIdentity;
    return `Evaluasi atribut Identitas Test untuk ${reportTypeLabel.toLowerCase()} ini:

Data Identitas Test:
- ID Test: ${testIdentity?.testId || 'Tidak disediakan'}
- Versi: ${testIdentity?.version || 'Tidak disediakan'}
- Judul: ${testIdentity?.title || 'Tidak disediakan'}

Kriteria Penilaian:
- ID Test disediakan dan valid: +0.4
- Versi disediakan: +0.3
- Nama test case disediakan: +0.3

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }

  private buildGenericPrompt(
    attribute: AttributeType,
    report: UATReport,
    reportTypeLabel: string,
  ): string {
    return `Evaluasi atribut ${attribute} untuk ${reportTypeLabel.toLowerCase()} ini.

Data Laporan:
${JSON.stringify(report, null, 2)}

Berikan skor dari 0.0 hingga 1.0 berdasarkan kualitas dan kelengkapan atribut ini.

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
  }
}

