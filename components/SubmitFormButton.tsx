"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const SubmitFormButton = ({button_desc}: { button_desc: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="flex w-full" aria-disabled={pending}>
      {pending ? `${button_desc}ing Procduct...` : `${button_desc} Procduct`}
    </Button>
  );
};

export default SubmitFormButton;
