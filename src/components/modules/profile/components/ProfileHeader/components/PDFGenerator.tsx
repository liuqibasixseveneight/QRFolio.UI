import {
  Document,
  Page,
  Text,
  View,
  pdf as reactPdf,
} from '@react-pdf/renderer';

import { formatDateForPDF } from '../utils';
import { htmlToPDFText } from '../utils/htmlToPDFText';
import type { ProfileHeaderProps } from '../types';
import { pdfStyles } from './PDFGenerator.styles';

/**
 * Generates and downloads a PDF resume from profile data
 */
export const generatePDF = async (profileData: ProfileHeaderProps) => {
  const {
    fullName,
    summary,
    email,
    phone,
    linkedin,
    portfolio,
    workExperience = [],
    education = [],
    languages = [],
    skills = [],
  } = profileData;

  // Helper function to format phone display for PDF
  const formatPhoneDisplay = (phoneData: any) => {
    if (typeof phoneData === 'string') {
      return phoneData;
    }
    if (phoneData && phoneData.number) {
      const countryInfo =
        phoneData.countryCode && phoneData.dialCode
          ? `${phoneData.countryCode} ${phoneData.dialCode}`
          : '';
      return countryInfo
        ? `${countryInfo} • ${phoneData.number}`
        : phoneData.number;
    }
    return phoneData;
  };

  const MyDocument = () => (
    <Document>
      <Page size='A4' style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{fullName || 'Profile'}</Text>
          {summary && <Text style={pdfStyles.summary}>{summary}</Text>}
        </View>

        {(email || phone || linkedin || portfolio) && (
          <View style={pdfStyles.contactGrid}>
            {email && (
              <View style={pdfStyles.contactItem}>
                <Text style={pdfStyles.contactLabel}>Email: </Text>
                <Text style={pdfStyles.contactValue}>{email}</Text>
              </View>
            )}
            {phone && (
              <View style={pdfStyles.contactItem}>
                <Text style={pdfStyles.contactLabel}>Phone: </Text>
                <Text style={pdfStyles.contactValue}>
                  {formatPhoneDisplay(phone)}
                </Text>
              </View>
            )}
            {linkedin && (
              <View style={pdfStyles.contactItem}>
                <Text style={pdfStyles.contactLabel}>LinkedIn: </Text>
                <Text style={pdfStyles.contactValue}>{linkedin}</Text>
              </View>
            )}
            {portfolio && (
              <View style={pdfStyles.contactItem}>
                <Text style={pdfStyles.contactLabel}>Portfolio: </Text>
                <Text style={pdfStyles.contactValue}>{portfolio}</Text>
              </View>
            )}
          </View>
        )}

        {workExperience && workExperience.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Professional Experience</Text>
            {workExperience.map((exp, index) => (
              <View key={index} style={pdfStyles.experienceItem}>
                <Text style={pdfStyles.jobTitle}>
                  {exp?.jobTitle || 'Job Title'}
                </Text>
                <Text style={pdfStyles.companyInfo}>
                  {exp?.companyName || 'Company'}
                  {exp?.location && ` • ${exp.location}`}
                  {exp?.dateFrom &&
                    exp?.dateTo &&
                    ` • ${formatDateForPDF(exp.dateFrom)} - ${formatDateForPDF(
                      exp.dateTo
                    )}`}
                </Text>
                {exp?.responsibilities && (
                  <Text style={pdfStyles.responsibilities}>
                    {htmlToPDFText(exp.responsibilities)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {education && education.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={pdfStyles.educationItem}>
                <Text style={pdfStyles.degree}>{edu?.degree || 'Degree'}</Text>
                <Text style={pdfStyles.schoolInfo}>
                  {edu?.schoolName || 'School'}
                  {edu?.dateFrom &&
                    edu?.dateTo &&
                    ` • ${formatDateForPDF(edu.dateFrom)} - ${formatDateForPDF(
                      edu.dateTo
                    )}`}
                </Text>
                {edu?.description && (
                  <Text style={pdfStyles.responsibilities}>
                    {htmlToPDFText(edu.description)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {languages && languages.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Languages</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {languages.map((lang, index) => (
                <View key={index} style={pdfStyles.languageItem}>
                  <Text style={pdfStyles.language}>
                    {lang?.language || 'Language'}
                  </Text>
                  <Text style={pdfStyles.fluency}>
                    {lang?.fluencyLevel || 'Fluency Level'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Skills</Text>
            {skills.map((category, categoryIndex) => (
              <View key={categoryIndex} style={pdfStyles.skillCategory}>
                <Text style={pdfStyles.skillCategoryTitle}>
                  {category?.title || 'Skills'}:
                </Text>
                <Text style={pdfStyles.skillsText}>
                  {category?.skills
                    ?.map((skill) => skill?.skill || '')
                    ?.filter((skill) => skill?.trim() !== '')
                    ?.join(', ') || ''}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );

  // Generate and download PDF
  const blob = await reactPdf(<MyDocument />).toBlob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Handles the PDF download process with loading states and error handling
 */
export const handleDownloadPDF = async (profileData: ProfileHeaderProps) => {
  try {
    // Show loading state
    const button = document.querySelector(
      '[data-download-resume]'
    ) as HTMLButtonElement;
    if (button) {
      button.disabled = true;
      button.innerHTML = `
         <span class="flex items-center gap-3">
           <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
           <span>Generating PDF...</span>
         </span>
       `;
    }

    await generatePDF(profileData);

    // Show success feedback
    if (button) {
      button.disabled = false;
      button.innerHTML = `
         <span class="flex items-center gap-3">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
           </svg>
           <span>Downloaded!</span>
         </span>
       `;

      // Reset to original state after 2 seconds
      setTimeout(() => {
        button.innerHTML = `
            <span class="flex items-center gap-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Download PDF</span>
            </span>
          `;
      }, 2000);
    }
  } catch (error) {
    console.error('Failed to generate PDF:', error);

    // Reset button state on error
    const button = document.querySelector(
      '[data-download-resume]'
    ) as HTMLButtonElement;
    if (button) {
      button.disabled = false;
      button.innerHTML = `
         <span class="flex items-center gap-3">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
           </svg>
           <span>Download PDF</span>
         </span>
       `;
    }

    // Show more specific error message
    if (error instanceof Error) {
      alert(`Failed to generate PDF: ${error.message}`);
    } else {
      alert('Failed to generate PDF. Please try again.');
    }
  }
};
