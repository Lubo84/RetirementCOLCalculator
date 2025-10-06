import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "./ProgressIndicator";
import FrequencySelector, { type Frequency } from "./FrequencySelector";
import InfoCard from "./InfoCard";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface StepTwoData {
  takeHomePay: number;
  takeHomePayFrequency: Frequency;
  partnerTakeHomePay?: number;
  partnerTakeHomePayFrequency?: Frequency;
  mortgageRepayment?: number;
  mortgageRepaymentFrequency?: Frequency;
  rentalAmount?: number;
  rentalAmountFrequency?: Frequency;
  savings: number;
  savingsFrequency: Frequency;
}

interface StepTwoProps {
  data: StepTwoData;
  isCouple: boolean;
  isHomeOwner: boolean;
  onNext: (data: StepTwoData) => void;
  onBack: () => void;
}

export default function StepTwo({ data, isCouple, isHomeOwner, onNext, onBack }: StepTwoProps) {
  const [formData, setFormData] = useState<StepTwoData>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = 
    formData.takeHomePay > 0 &&
    (!isCouple || (formData.partnerTakeHomePay && formData.partnerTakeHomePay > 0)) &&
    formData.savings >= 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <ProgressIndicator currentStep={2} totalSteps={3} />
          <h2 className="text-3xl font-semibold text-foreground mt-6 mb-2">
            Your Financial Details
          </h2>
          <p className="text-muted-foreground">
            Enter your income, housing costs, and savings information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InfoCard>
            <p>
              <strong>Take home pay</strong> is your income after tax has been deducted. 
              This is the amount that gets deposited into your bank account.
            </p>
          </InfoCard>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="takeHomePay" className="text-base font-semibold text-foreground mb-3 block">
                  {isCouple ? "Your Take Home Pay" : "Take Home Pay"}
                </Label>
                <Input
                  id="takeHomePay"
                  type="number"
                  placeholder="0.00"
                  value={formData.takeHomePay || ""}
                  onChange={(e) => setFormData({ ...formData, takeHomePay: parseFloat(e.target.value) || 0 })}
                  className="mb-3"
                  data-testid="input-take-home-pay"
                />
                <FrequencySelector
                  value={formData.takeHomePayFrequency}
                  onChange={(freq) => setFormData({ ...formData, takeHomePayFrequency: freq })}
                />
              </div>

              {isCouple && (
                <div>
                  <Label htmlFor="partnerTakeHomePay" className="text-base font-semibold text-foreground mb-3 block">
                    Partner's Take Home Pay
                  </Label>
                  <Input
                    id="partnerTakeHomePay"
                    type="number"
                    placeholder="0.00"
                    value={formData.partnerTakeHomePay || ""}
                    onChange={(e) => setFormData({ ...formData, partnerTakeHomePay: parseFloat(e.target.value) || 0 })}
                    className="mb-3"
                    data-testid="input-partner-take-home-pay"
                  />
                  <FrequencySelector
                    value={formData.partnerTakeHomePayFrequency || "weekly"}
                    onChange={(freq) => setFormData({ ...formData, partnerTakeHomePayFrequency: freq })}
                  />
                </div>
              )}

              {isHomeOwner && (
                <div>
                  <Label htmlFor="mortgageRepayment" className="text-base font-semibold text-foreground mb-3 block">
                    Mortgage Repayments
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Leave at 0 if you don't have a mortgage
                  </p>
                  <Input
                    id="mortgageRepayment"
                    type="number"
                    placeholder="0.00"
                    value={formData.mortgageRepayment || ""}
                    onChange={(e) => setFormData({ ...formData, mortgageRepayment: parseFloat(e.target.value) || 0 })}
                    className="mb-3"
                    data-testid="input-mortgage-repayment"
                  />
                  <FrequencySelector
                    value={formData.mortgageRepaymentFrequency || "monthly"}
                    onChange={(freq) => setFormData({ ...formData, mortgageRepaymentFrequency: freq })}
                  />
                </div>
              )}

              {!isHomeOwner && (
                <div>
                  <Label htmlFor="rentalAmount" className="text-base font-semibold text-foreground mb-3 block">
                    Rental Amount
                  </Label>
                  <Input
                    id="rentalAmount"
                    type="number"
                    placeholder="0.00"
                    value={formData.rentalAmount || ""}
                    onChange={(e) => setFormData({ ...formData, rentalAmount: parseFloat(e.target.value) || 0 })}
                    className="mb-3"
                    data-testid="input-rental-amount"
                  />
                  <FrequencySelector
                    value={formData.rentalAmountFrequency || "weekly"}
                    onChange={(freq) => setFormData({ ...formData, rentalAmountFrequency: freq })}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="savings" className="text-base font-semibold text-foreground mb-3 block">
                  Savings Amount
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Extra super contributions, money into bank account, etc.
                </p>
                <Input
                  id="savings"
                  type="number"
                  placeholder="0.00"
                  value={formData.savings || ""}
                  onChange={(e) => setFormData({ ...formData, savings: parseFloat(e.target.value) || 0 })}
                  className="mb-3"
                  data-testid="input-savings"
                />
                <FrequencySelector
                  value={formData.savingsFrequency}
                  onChange={(freq) => setFormData({ ...formData, savingsFrequency: freq })}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
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
