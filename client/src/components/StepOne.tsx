import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProgressIndicator from "./ProgressIndicator";
import { ArrowRight } from "lucide-react";

interface StepOneData {
  relationshipStatus: "single" | "couple";
  homeOwnership: "own" | "rent" | "expect-to-own";
  yearsToRetirement: "<5" | "5-10" | ">10";
}

interface StepOneProps {
  data: StepOneData;
  onNext: (data: StepOneData) => void;
}

export default function StepOne({ data, onNext }: StepOneProps) {
  const [formData, setFormData] = useState<StepOneData>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = formData.relationshipStatus && formData.homeOwnership && formData.yearsToRetirement;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <ProgressIndicator currentStep={1} totalSteps={3} />
          <h2 className="text-3xl font-semibold text-foreground mt-6 mb-2">
            Let's Start with the Basics
          </h2>
          <p className="text-muted-foreground">
            Tell us about your situation so we can personalize your results
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-8 mb-6">
            <div className="space-y-8">
              <div>
                <Label className="text-base font-semibold text-foreground mb-4 block">
                  Are you planning for retirement as a single person or part of a couple?
                </Label>
                <RadioGroup
                  value={formData.relationshipStatus}
                  onValueChange={(value) =>
                    setFormData({ ...formData, relationshipStatus: value as "single" | "couple" })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="single" id="single" data-testid="radio-single" />
                    <Label htmlFor="single" className="cursor-pointer flex-1 font-normal">
                      Single
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="couple" id="couple" data-testid="radio-couple" />
                    <Label htmlFor="couple" className="cursor-pointer flex-1 font-normal">
                      Couple
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold text-foreground mb-4 block">
                  What is your home ownership status?
                </Label>
                <RadioGroup
                  value={formData.homeOwnership}
                  onValueChange={(value) =>
                    setFormData({ ...formData, homeOwnership: value as "own" | "rent" | "expect-to-own" })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="own" id="own" data-testid="radio-own" />
                    <Label htmlFor="own" className="cursor-pointer flex-1 font-normal">
                      I own my home (including with a mortgage)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="rent" id="rent" data-testid="radio-rent" />
                    <Label htmlFor="rent" className="cursor-pointer flex-1 font-normal">
                      I rent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="expect-to-own" id="expect-to-own" data-testid="radio-expect-own" />
                    <Label htmlFor="expect-to-own" className="cursor-pointer flex-1 font-normal">
                      I expect to own my home by retirement
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-semibold text-foreground mb-4 block">
                  How many years from now do you expect to retire?
                </Label>
                <RadioGroup
                  value={formData.yearsToRetirement}
                  onValueChange={(value) =>
                    setFormData({ ...formData, yearsToRetirement: value as "<5" | "5-10" | ">10" })
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="<5" id="less-5" data-testid="radio-less-5" />
                    <Label htmlFor="less-5" className="cursor-pointer flex-1 font-normal">
                      Less than 5 years
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value="5-10" id="5-10" data-testid="radio-5-10" />
                    <Label htmlFor="5-10" className="cursor-pointer flex-1 font-normal">
                      5-10 years
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer">
                    <RadioGroupItem value=">10" id="more-10" data-testid="radio-more-10" />
                    <Label htmlFor="more-10" className="cursor-pointer flex-1 font-normal">
                      More than 10 years
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={!isValid}
              className="bg-primary text-primary-foreground px-8"
              data-testid="button-continue"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
