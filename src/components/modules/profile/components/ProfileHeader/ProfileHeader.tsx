import { useState } from 'react';
import {
  Download,
  Share2,
  QrCode,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Globe,
} from 'lucide-react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf as reactPdf,
} from '@react-pdf/renderer';

import {
  AvailabilityBadge,
  ProfileHeaderBadge,
  QRCodeModal,
} from '@/components/ui';
import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({
  fullName,
  summary,
  email,
  phone,
  linkedin,
  portfolio,
  availability,
  workExperience = [],
  education = [],
  languages = [],
  updatedAt,
}: ProfileHeaderProps) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Helper function to format phone display
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

  // Helper function to format date in day/month/year format
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper function to format date in month/year format for PDF
  const formatDateForPDF = (dateString: string | Date) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const handleDownloadPDF = async () => {
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

      // Create PDF styles
      const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          padding: 40,
          fontFamily: 'Helvetica',
        },
        header: {
          marginBottom: 25,
          textAlign: 'center',
          borderBottom: '2px solid #000000',
          paddingBottom: 15,
        },
        name: {
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        summary: {
          fontSize: 11,
          color: '#333333',
          marginBottom: 0,
          lineHeight: 1.4,
          fontStyle: 'italic',
        },
        section: {
          marginBottom: 18,
        },
        sectionTitle: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 8,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          borderBottom: '1px solid #000000',
          paddingBottom: 3,
        },
        contactGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 25,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        },
        contactItem: {
          width: 'auto',
          marginBottom: 0,
          fontSize: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        contactLabel: {
          fontWeight: 'bold',
          color: '#000000',
          marginRight: 4,
        },
        contactValue: {
          color: '#333333',
        },
        experienceItem: {
          marginBottom: 16,
          paddingLeft: 0,
          paddingTop: 4,
          paddingBottom: 4,
        },
        jobTitle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: 2,
          textTransform: 'uppercase',
        },
        companyInfo: {
          fontSize: 10,
          color: '#333333',
          marginBottom: 6,
          fontStyle: 'italic',
        },
        responsibilities: {
          fontSize: 9,
          color: '#333333',
          lineHeight: 1.3,
          marginLeft: 10,
          marginTop: 2,
        },
        educationItem: {
          marginBottom: 16,
          paddingLeft: 0,
          paddingTop: 4,
          paddingBottom: 4,
        },
        degree: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: 2,
          textTransform: 'uppercase',
        },
        schoolInfo: {
          fontSize: 10,
          color: '#333333',
          fontStyle: 'italic',
          marginBottom: 6,
        },
        languageItem: {
          marginBottom: 0,
          paddingLeft: 0,
          marginRight: 15,
        },
        language: {
          fontSize: 10,
          fontWeight: 'bold',
          color: '#000000',
        },
        fluency: {
          fontSize: 9,
          color: '#333333',
          fontStyle: 'italic',
        },
        footer: {
          marginTop: 25,
          textAlign: 'center',
          fontSize: 8,
          color: '#666666',
          borderTop: '1px solid #000000',
          paddingTop: 8,
        },
      });

      // Create PDF document
      const MyDocument = () => (
        <Document>
          <Page size='A4' style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.name}>{fullName || 'Profile'}</Text>
              {summary && <Text style={styles.summary}>{summary}</Text>}
            </View>

            {/* Contact Information */}
            {(email || phone || linkedin || portfolio) && (
              <View style={styles.contactGrid}>
                {email && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Email: </Text>
                    <Text style={styles.contactValue}>{email}</Text>
                  </View>
                )}
                {phone && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Phone: </Text>
                    <Text style={styles.contactValue}>
                      {formatPhoneDisplay(phone)}
                    </Text>
                  </View>
                )}
                {linkedin && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>LinkedIn: </Text>
                    <Text style={styles.contactValue}>{linkedin}</Text>
                  </View>
                )}
                {portfolio && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>Portfolio: </Text>
                    <Text style={styles.contactValue}>{portfolio}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {workExperience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>
                      {exp?.jobTitle || 'Job Title'}
                    </Text>
                    <Text style={styles.companyInfo}>
                      {exp?.companyName || 'Company'}
                      {exp?.location && ` • ${exp.location}`}
                      {exp?.dateFrom &&
                        exp?.dateTo &&
                        ` • ${formatDateForPDF(
                          exp.dateFrom
                        )} - ${formatDateForPDF(exp.dateTo)}`}
                    </Text>
                    {exp?.responsibilities && (
                      <Text style={styles.responsibilities}>
                        {exp.responsibilities}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>
                      {edu?.degree || 'Degree'} in{' '}
                      {edu?.fieldOfStudy || 'Field of Study'}
                    </Text>
                    <Text style={styles.schoolInfo}>
                      {edu?.schoolName || 'School'}
                      {edu?.dateFrom &&
                        edu?.dateTo &&
                        ` • ${formatDateForPDF(
                          edu.dateFrom
                        )} - ${formatDateForPDF(edu.dateTo)}`}
                    </Text>
                    {edu?.description && (
                      <Text style={styles.responsibilities}>
                        {edu.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {languages.map((lang, index) => (
                    <View key={index} style={styles.languageItem}>
                      <Text style={styles.language}>
                        {lang?.language || 'Language'}
                      </Text>
                      <Text style={styles.fluency}>
                        {lang?.fluencyLevel || 'Fluency Level'}
                      </Text>
                    </View>
                  ))}
                </View>
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
      link.download = `${
        fullName?.replace(/\s+/g, '_') || 'Resume'
      }_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

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

  const handleShareProfile = async () => {
    try {
      const profileUrl = window.location.href;
      await navigator.clipboard.writeText(profileUrl);

      // Show success feedback
      const button = document.querySelector(
        '[data-share-profile]'
      ) as HTMLButtonElement;
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = `
          <span class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Copied!</span>
          </span>
        `;

        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to copy profile link:', error);
      alert('Failed to copy profile link. Please try again.');
    }
  };

  const handleViewQRCode = () => {
    setIsQRModalOpen(true);
  };

  return (
    <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
      {/* Content container with proper width constraints */}
      <div className='w-full px-6 sm:px-8 lg:px-12'>
        <div className='max-w-6xl mx-auto w-full'>
          <header className='relative w-full'>
            {/* Content */}
            <div className='px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32'>
              <div className='w-full'>
                {/* Availability Badge */}
                <AvailabilityBadge
                  availability={availability}
                  className='mb-10'
                />

                {/* Name */}
                <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 mb-8 sm:mb-10 leading-tight'>
                  {fullName}
                </h1>

                {/* Summary */}
                {summary && (
                  <div className='max-w-4xl mb-12 sm:mb-16'>
                    <p className='text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-relaxed font-light'>
                      {summary}
                    </p>
                  </div>
                )}

                {/* Contact Information Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12'>
                  {email && (
                    <ProfileHeaderBadge
                      icon={Mail}
                      label={email}
                      type='email'
                      href={email}
                    />
                  )}
                  {phone && (
                    <ProfileHeaderBadge
                      icon={Phone}
                      label={formatPhoneDisplay(phone)}
                      type='phone'
                    />
                  )}
                  {linkedin && (
                    <ProfileHeaderBadge
                      icon={Linkedin}
                      label='LinkedIn'
                      type='linkedin'
                      href={linkedin}
                    />
                  )}
                  {portfolio && (
                    <ProfileHeaderBadge
                      icon={Globe}
                      label={portfolio}
                      type='link'
                      href={portfolio}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12'>
                  <button
                    data-download-resume
                    onClick={handleDownloadPDF}
                    className='bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    <span className='flex items-center gap-3'>
                      <Download className='w-6 h-6' />
                      <span>Download Resume</span>
                    </span>
                  </button>

                  <button
                    data-share-profile
                    onClick={handleShareProfile}
                    className='bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 cursor-pointer whitespace-nowrap'
                  >
                    <span className='flex items-center gap-3'>
                      <Share2 className='w-6 h-6' />
                      <span>Share Profile</span>
                    </span>
                  </button>

                  <button
                    onClick={handleViewQRCode}
                    className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-medium text-lg transition-all duration-300 cursor-pointer'
                  >
                    <span className='flex items-center gap-3'>
                      <QrCode className='w-6 h-6' />
                      <span>QR Code</span>
                    </span>
                  </button>
                </div>

                {/* Stats Row */}
                <div className='flex flex-wrap items-center gap-8 text-sm text-gray-500 mb-8'>
                  <span className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    Last Updated:{' '}
                    {updatedAt ? formatDate(updatedAt) : formatDate(new Date())}
                  </span>
                </div>

                {/* Decorative line */}
                <div className='w-32 h-px bg-gray-300'></div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        profileData={{
          link: window.location.href,
          labels: {
            fullName: fullName || '',
            professionalSummary: summary || '',
          },
        }}
      />
    </div>
  );
};

export default ProfileHeader;
