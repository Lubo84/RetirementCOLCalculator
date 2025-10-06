import { useState } from "react";
import WelcomeHero from "@/components/WelcomeHero";
import StepOne from "@/components/StepOne";
import StepTwo, { type StepTwoData } from "@/components/StepTwo";
import ResultsPage from "@/components/ResultsPage";
import { type Frequency } from "@/components/FrequencySelector";

type CalculatorStep = "welcome" | "step1" | "step2" | "results";

interface StepOneData {
  relationshipStatus: "single" | "couple";
  homeOwnership: "own" | "rent" | "expect-to-own";
  yearsToRetirement: "<5" | "5-10" | ">10";
}

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState<CalculatorStep>("welcome");
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    relationshipStatus: "single",
    homeOwnership: "own",
    yearsToRetirement: "5-10",
  });
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    takeHomePay: 0,
    takeHomePayFrequency: "weekly",
    savings: 0,
    savingsFrequency: "weekly",
  });

  const convertToYearly = (amount: number, frequency: Frequency): number => {
    switch (frequency) {
      case "weekly":
        return amount * 52;
      case "fortnightly":
        return amount * 26;
      case "monthly":
        return amount * 12;
      case "yearly":
        return amount;
    }
  };

  const calculateCostOfLiving = (): { weekly: number; yearly: number } => {
    const isCouple = stepOneData.relationshipStatus === "couple";
    const isHomeOwner = stepOneData.homeOwnership === "own" || stepOneData.homeOwnership === "expect-to-own";

    let totalIncome = convertToYearly(stepTwoData.takeHomePay, stepTwoData.takeHomePayFrequency);
    if (isCouple && stepTwoData.partnerTakeHomePay && stepTwoData.partnerTakeHomePayFrequency) {
      totalIncome += convertToYearly(stepTwoData.partnerTakeHomePay, stepTwoData.partnerTakeHomePayFrequency);
    }

    const totalSavings = convertToYearly(stepTwoData.savings, stepTwoData.savingsFrequency);

    let costOfLiving = totalIncome - totalSavings;

    if (isHomeOwner && stepTwoData.mortgageRepayment && stepTwoData.mortgageRepaymentFrequency) {
      const mortgage = convertToYearly(stepTwoData.mortgageRepayment, stepTwoData.mortgageRepaymentFrequency);
      costOfLiving -= mortgage;
    }

    return {
      yearly: costOfLiving,
      weekly: costOfLiving / 52,
    };
  };

  const handleStepOneNext = (data: StepOneData) => {
    setStepOneData(data);
    setCurrentStep("step2");
  };

  const handleStepTwoNext = (data: StepTwoData) => {
    setStepTwoData(data);
    setCurrentStep("results");
  };

  const handleRestart = () => {
    setCurrentStep("welcome");
    setStepOneData({
      relationshipStatus: "single",
      homeOwnership: "own",
      yearsToRetirement: "5-10",
    });
    setStepTwoData({
      takeHomePay: 0,
      takeHomePayFrequency: "weekly",
      savings: 0,
      savingsFrequency: "weekly",
    });
  };

  const isCouple = stepOneData.relationshipStatus === "couple";
  const isHomeOwner = stepOneData.homeOwnership === "own" || stepOneData.homeOwnership === "expect-to-own";

  if (currentStep === "welcome") {
    return <WelcomeHero onGetStarted={() => setCurrentStep("step1")} />;
  }

  if (currentStep === "step1") {
    return <StepOne data={stepOneData} onNext={handleStepOneNext} />;
  }

  if (currentStep === "step2") {
    return (
      <StepTwo
        data={stepTwoData}
        isCouple={isCouple}
        isHomeOwner={isHomeOwner}
        onNext={handleStepTwoNext}
        onBack={() => setCurrentStep("step1")}
      />
    );
  }

  const { weekly, yearly } = calculateCostOfLiving();

  return (
    <ResultsPage
      weeklyAmount={weekly}
      yearlyAmount={yearly}
      isCouple={isCouple}
      isHomeOwner={isHomeOwner}
      yearsToRetirement={stepOneData.yearsToRetirement}
      onBack={() => setCurrentStep("step2")}
      onRestart={handleRestart}
    />
  );
}
