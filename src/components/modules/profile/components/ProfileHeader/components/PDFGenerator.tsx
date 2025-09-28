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
import { useToast } from '@/components/ui/molecules/Toast/use-toast';

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
 * Handles the PDF download process with toast notifications
 */
export const handleDownloadPDF = async (
  profileData: ProfileHeaderProps,
  toast: any
) => {
  try {
    await generatePDF(profileData);

    toast({
      title: 'PDF Downloaded Successfully! 📄',
      description: 'Your resume has been saved as a PDF.',
      variant: 'success',
    });
  } catch (error) {
    console.error('Failed to generate PDF:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    toast({
      title: 'PDF Download Failed',
      description: `Failed to generate PDF: ${errorMessage}`,
      variant: 'destructive',
    });
  }
};
