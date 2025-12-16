/* eslint-disable @typescript-eslint/no-explicit-any */
// components/free-trial/steps/Step3PersonalInfo.tsx
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
}

export const Step3PersonalInfo = ({ formData, setFormData }: Step3Props) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name (Student) <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="studentFirstName"
            value={formData.studentFirstName}
            onChange={(e) =>
              setFormData({ ...formData, studentFirstName: e.target.value })
            }
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name (Student) <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="studentLastName"
            value={formData.studentLastName}
            onChange={(e) =>
              setFormData({ ...formData, studentLastName: e.target.value })
            }
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="flex items-center">
        <Checkbox
          checked={formData.isUnder18}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isUnder18: checked })
          }
        />
        <label className="ml-2 text-sm text-gray-700">
          Is the student under age 18?
        </label>
      </div>

      {formData.isUnder18 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name (Legal Guardian){" "}
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="guardianFirstName"
                value={formData.guardianFirstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guardianFirstName: e.target.value,
                  })
                }
                placeholder="Enter guardian first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name (Legal Guardian){" "}
                <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="guardianLastName"
                value={formData.guardianLastName}
                onChange={(e) =>
                  setFormData({ ...formData, guardianLastName: e.target.value })
                }
                placeholder="Enter guardian last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone (Legal Guardian) <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={(e) =>
                setFormData({ ...formData, guardianPhone: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
        />
      </div>

      <div className="flex items-start">
        <Checkbox
          checked={formData.agreeToPolicy}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, agreeToPolicy: checked })
          }
        />
        <label className="ml-2 text-sm text-gray-700">
          I have read and agree to the{" "}
          <Link href="/privacy" className="text-blue-600 underline">
            Privacy Policy
          </Link>{" "}
          <span className="text-red-500">*</span>
        </label>
      </div>
    </div>
  );
};
