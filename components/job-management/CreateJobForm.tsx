"use client";
import { Input } from "../ui/input";
import { BrutalSelect } from "../BrutalUI";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {createJobAction} from "@/app/actions/jobs/createJob.action";

function CreateJobForm() {
  const navigate = useRouter();

  return (
    <form action={createJobAction} className="mt-8 brutal-border p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="JOB TITLE"
          name="title"
          placeholder="e.g. SENIOR FRONTEND ENGINEER"
          required
        />
        <Input
          label="COMPANY"
          name="company"
          placeholder="e.g. NEXUS LABS"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="LOCATION"
          name="location"
          placeholder="e.g. REMOTE"
          required
        />
        <BrutalSelect
          label="TYPE"
          name="type"
          options={[
            { value: "FULL-TIME", label: "FULL-TIME" },
            { value: "PART-TIME", label: "PART-TIME" },
            { value: "CONTRACT", label: "CONTRACT" },
            { value: "FREELANCE", label: "FREELANCE" },
          ]}
        />
        <Input
          label="SALARY RANGE"
          name="salary"
          placeholder="e.g. $140K–$180K"
          required
        />
      </div>

      <Input
        label="TAGS (COMMA SEPARATED)"
        name="tags"
        placeholder="e.g. REACT, TYPESCRIPT, WEBGL"
      />

      <div>
        <label className="font-heading text-xs font-bold uppercase block mb-2">
          DESCRIPTION
        </label>
        <textarea
          className="w-full brutal-border bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px] focus:shadow-accent min-h-[120px] resize-y"
          name="description"
          placeholder="Describe the role, responsibilities, and what makes it exciting..."
          required
        />
      </div>

      <div>
        <label className="font-heading text-xs font-bold uppercase block mb-2">
          REQUIREMENTS (ONE PER LINE)
        </label>
        <textarea
          className="w-full brutal-border bg-background px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px] focus:shadow-accent min-h-[100px] resize-y"
          name="requirements"
          placeholder={
            "5+ years React\nTypeScript expert\nSystem design skills"
          }
        />
      </div>

      <div className="flex gap-0 pt-4 border-t-3 border-foreground">
        <Button type="submit" variant="accent">
          PUBLISH JOB
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="border-l-0"
          onClick={() => navigate.push("/dashboard/jobs")}
        >
          CANCEL
        </Button>
      </div>
    </form>
  );
}

export default CreateJobForm;