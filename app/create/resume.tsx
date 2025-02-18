import React, { useState } from 'react';
import { StyleSheet, ScrollView, Platform, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

type FormStep = {
  title: string;
  icon: string;
  fields: FormField[];
};

type FormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'date' | 'array';
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
};

const formSteps: FormStep[] = [
  {
    title: 'Personal Details',
    icon: 'person.fill',
    fields: [
      { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter your first name', required: true },
      { id: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter your last name', required: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' },
      { id: 'location', label: 'Location', type: 'text', placeholder: 'Enter your location' },
      { id: 'portfolio', label: 'Portfolio Website', type: 'url', placeholder: 'Enter your portfolio URL' },
      { id: 'linkedin', label: 'LinkedIn Profile', type: 'url', placeholder: 'Enter your LinkedIn URL' }
    ]
  },
  {
    title: 'Objective',
    icon: 'target',
    fields: [
      { 
        id: 'objective', 
        label: 'Career Summary', 
        type: 'textarea', 
        placeholder: 'Brief summary of your career goals and aspirations',
        multiline: true,
        required: true
      },
      { 
        id: 'experience', 
        label: 'Years of Experience', 
        type: 'text', 
        placeholder: 'Enter your total years of experience' 
      },
      { 
        id: 'desiredRoles', 
        label: 'Desired Job Roles', 
        type: 'text', 
        placeholder: 'e.g., Software Engineer, Tech Lead (separate with commas)' 
      }
    ]
  },
  {
    title: 'Education',
    icon: 'graduationcap.fill',
    fields: [
      { 
        id: 'degree', 
        label: 'Degree Name', 
        type: 'text', 
        placeholder: 'Enter your degree name',
        required: true
      },
      { 
        id: 'university', 
        label: 'University Name', 
        type: 'text', 
        placeholder: 'Enter your university name',
        required: true
      },
      { 
        id: 'gradYear', 
        label: 'Graduation Year', 
        type: 'text', 
        placeholder: 'Enter your graduation year',
        required: true
      },
      { 
        id: 'coursework', 
        label: 'Relevant Coursework', 
        type: 'text', 
        placeholder: 'Enter relevant courses (separate with commas)' 
      }
    ]
  },
  {
    title: 'Skills',
    icon: 'hammer.fill',
    fields: [
      { 
        id: 'technicalSkills', 
        label: 'Technical Skills', 
        type: 'text', 
        placeholder: 'Enter technical skills (separate with commas)',
        required: true
      },
      { 
        id: 'softSkills', 
        label: 'Soft Skills', 
        type: 'text', 
        placeholder: 'Enter soft skills (separate with commas)' 
      },
      { 
        id: 'additionalSkills', 
        label: 'Additional Skills', 
        type: 'text', 
        placeholder: 'Enter additional skills, certifications (separate with commas)' 
      }
    ]
  },
  {
    title: 'Experience',
    icon: 'briefcase.fill',
    fields: [
      { 
        id: 'jobTitle', 
        label: 'Job Title', 
        type: 'text', 
        placeholder: 'Enter your job title',
        required: true
      },
      { 
        id: 'company', 
        label: 'Company Name', 
        type: 'text', 
        placeholder: 'Enter company name',
        required: true
      },
      { 
        id: 'jobLocation', 
        label: 'Location', 
        type: 'text', 
        placeholder: 'Enter job location' 
      },
      { 
        id: 'startDate', 
        label: 'Start Date', 
        type: 'date', 
        placeholder: 'MM/YYYY',
        required: true
      },
      { 
        id: 'endDate', 
        label: 'End Date', 
        type: 'date', 
        placeholder: 'MM/YYYY or Present' 
      },
      { 
        id: 'achievements', 
        label: 'Achievements/Responsibilities', 
        type: 'textarea', 
        placeholder: 'Enter your key achievements and responsibilities',
        multiline: true,
        required: true
      }
    ]
  },
  {
    title: 'Projects',
    icon: 'folder.fill',
    fields: [
      { 
        id: 'projectTitle', 
        label: 'Project Title', 
        type: 'text', 
        placeholder: 'Enter project title',
        required: true
      },
      { 
        id: 'projectDesc', 
        label: 'Description', 
        type: 'textarea', 
        placeholder: 'Enter project description including technologies used',
        multiline: true,
        required: true
      },
      { 
        id: 'projectLink', 
        label: 'Project Link', 
        type: 'url', 
        placeholder: 'Enter project URL (if applicable)' 
      }
    ]
  },
  {
    title: 'Extra-Curricular',
    icon: 'person.2.fill',
    fields: [
      { 
        id: 'activities', 
        label: 'Activities', 
        type: 'textarea', 
        placeholder: 'Describe your extra-curricular activities',
        multiline: true
      },
      { 
        id: 'socialLinks', 
        label: 'Social Media Links', 
        type: 'text', 
        placeholder: 'Enter relevant social media links (separate with commas)' 
      }
    ]
  },
  {
    title: 'Leadership',
    icon: 'star.fill',
    fields: [
      { 
        id: 'leadershipRole', 
        label: 'Leadership Role', 
        type: 'text', 
        placeholder: 'Enter your leadership role' 
      },
      { 
        id: 'organization', 
        label: 'Organization Name', 
        type: 'text', 
        placeholder: 'Enter organization name' 
      },
      { 
        id: 'responsibilities', 
        label: 'Responsibilities', 
        type: 'textarea', 
        placeholder: 'Describe your leadership responsibilities',
        multiline: true
      }
    ]
  }
];

export default function CreateResumeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
      router.push('/portfolio');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.back();
    }
  };

  const currentFields = formSteps[currentStep].fields;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          {currentStep > 0 && (
            <Pressable onPress={handleBack} style={styles.backButton}>
              <IconSymbol 
                size={28} 
                name="chevron.left" 
                color="#007AFF"
              />
            </Pressable>
          )}
          <ThemedText type="title" style={styles.headerTitle}>
            {formSteps[currentStep].title}
          </ThemedText>
          <ThemedView style={styles.progressIndicator}>
            <ThemedText style={styles.progressText}>{`${currentStep + 1}/8`}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ScrollView style={styles.formContainer}>
          {currentFields.map((field) => (
            <ThemedView key={field.id} style={styles.fieldContainer}>
              <ThemedText style={styles.label}>
                {field.label} {field.required && '*'}
              </ThemedText>
              <TextInput
                style={[styles.input, field.multiline && styles.multilineInput]}
                placeholder={field.placeholder}
                placeholderTextColor="#666666"
                onChangeText={(value) => handleInputChange(field.id, value)}
                value={formData[field.id]}
                multiline={field.multiline}
                keyboardType={field.type === 'tel' ? 'phone-pad' : field.type === 'email' ? 'email-address' : 'default'}
                autoCapitalize={field.type === 'email' ? 'none' : 'words'}
                autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'off'}
              />
            </ThemedView>
          ))}
        </ScrollView>

        <ThemedView style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleNext}>
            <ThemedText style={styles.buttonText}>
              {currentStep === formSteps.length - 1 ? 'Submit' : 'Next'}
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 8,
  },
  progressIndicator: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 16,
    fontSize: 17,
    color: '#FFFFFF',
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});