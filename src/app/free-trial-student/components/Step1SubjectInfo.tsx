import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useActiveSubjects } from "@/hooks/api";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
}

export const Step1SubjectInfo = ({ formData, setFormData }: Step1Props) => {
  // Fetch subjects from backend API
  const { data: subjects = [], isLoading: subjectsLoading } = useActiveSubjects();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.subject}
          onValueChange={(value) =>
            setFormData({ ...formData, subject: value })
          }
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select your Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjectsLoading ? (
              <div className="px-2 py-1.5 text-sm text-gray-500">
                Loading...
              </div>
            ) : subjects.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-gray-500">
                No subjects available
              </div>
            ) : (
              subjects.map((subject) => (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grade <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.grade}
          onValueChange={(value) => setFormData({ ...formData, grade: value })}
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select your Grade" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((grade) => (
              <SelectItem key={grade} value={String(grade)}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Type <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.schoolType}
          onValueChange={(value) =>
            setFormData({ ...formData, schoolType: value })
          }
        >
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select your School Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GRUNDSCHULE">Grundschule (Primary)</SelectItem>
            <SelectItem value="HAUPTSCHULE">Hauptschule</SelectItem>
            <SelectItem value="REALSCHULE">Realschule</SelectItem>
            <SelectItem value="GYMNASIUM">Gymnasium</SelectItem>
            <SelectItem value="GESAMTSCHULE">Gesamtschule</SelectItem>
            <SelectItem value="BERUFSSCHULE">Berufsschule (Vocational)</SelectItem>
            <SelectItem value="UNIVERSITY">University</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
