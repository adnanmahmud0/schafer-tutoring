import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
}

export const Step1SubjectInfo = ({ formData, setFormData }: Step1Props) => {
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
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="languages">Languages</SelectItem>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
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
            <SelectItem value="public">Public School</SelectItem>
            <SelectItem value="private">Private School</SelectItem>
            <SelectItem value="homeschool">Homeschool</SelectItem>
            <SelectItem value="charter">Charter School</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
