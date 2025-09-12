import { StyleSheet } from '@react-pdf/renderer';

/**
 * PDF Generator Styles
 *
 * Contains all styling definitions for the PDF resume generation.
 * Separated from the main component for better organization and maintainability.
 * CSS properties are ordered alphabetically for consistency.
 */
export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    padding: 40,
  },
  header: {
    borderBottom: '2px solid #000000',
    marginBottom: 25,
    paddingBottom: 15,
    textAlign: 'center',
  },
  name: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  summary: {
    color: '#333333',
    fontStyle: 'italic',
    fontSize: 11,
    lineHeight: 1.4,
    marginBottom: 0,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    borderBottom: '1px solid #000000',
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingBottom: 3,
    textTransform: 'uppercase',
  },
  contactGrid: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 25,
  },
  contactItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
    marginBottom: 0,
    width: 'auto',
  },
  contactLabel: {
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 4,
  },
  contactValue: {
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 16,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingTop: 4,
  },
  jobTitle: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  companyInfo: {
    color: '#333333',
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  responsibilities: {
    color: '#333333',
    fontSize: 9,
    lineHeight: 1.3,
    marginLeft: 10,
    marginTop: 2,
  },
  educationItem: {
    marginBottom: 16,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingTop: 4,
  },
  degree: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  schoolInfo: {
    color: '#333333',
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  languageItem: {
    marginBottom: 0,
    marginRight: 15,
    paddingLeft: 0,
  },
  language: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fluency: {
    color: '#333333',
    fontSize: 9,
    fontStyle: 'italic',
  },
  skillsText: {
    color: '#333333',
    fontSize: 10,
    lineHeight: 1.4,
  },
  footer: {
    borderTop: '1px solid #000000',
    color: '#666666',
    fontSize: 8,
    marginTop: 25,
    paddingTop: 8,
    textAlign: 'center',
  },
});
