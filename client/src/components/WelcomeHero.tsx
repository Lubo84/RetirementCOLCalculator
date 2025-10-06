import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Target, FileCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface WelcomeHeroProps {
  onGetStarted: () => void;
}

export default function WelcomeHero({ onGetStarted }: WelcomeHeroProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-br from-hostplus-navy to-hostplus-navy-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Plan Your Retirement with{" "}
            <span className="text-hostplus-yellow">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Use our interactive calculator to estimate your cost of living in retirement. 
            Compare your needs against industry benchmarks and take the first step toward your financial future.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-hostplus-yellow hover:bg-hostplus-yellow/90 text-hostplus-navy font-semibold text-lg px-8 py-6 h-auto"
            data-testid="button-get-started"
          >
            Get Started
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-background py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-12">
            How It Works
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="step1" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="accordion-step1">
                <div className="flex items-center gap-4 text-left">
                  <div className="rounded-full bg-hostplus-yellow/20 p-3">
                    <Calculator className="h-6 w-6 text-hostplus-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 1: Tell Us About Your Situation</p>
                    <p className="text-sm text-muted-foreground">Your relationship status, home ownership, and retirement timeframe</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 text-muted-foreground">
                We'll ask a few simple questions about whether you're planning as a single person or couple, 
                if you own your home, and how far away retirement is. This helps us tailor the calculations to your specific circumstances.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step2" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="accordion-step2">
                <div className="flex items-center gap-4 text-left">
                  <div className="rounded-full bg-hostplus-yellow/20 p-3">
                    <TrendingUp className="h-6 w-6 text-hostplus-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 2: Share Your Financial Details</p>
                    <p className="text-sm text-muted-foreground">Income, housing costs, and savings information</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 text-muted-foreground">
                Enter your take-home pay, mortgage or rent, and savings contributions. Choose the payment frequency that works 
                best for you—weekly, fortnightly, monthly, or yearly. We'll calculate your current cost of living based on this information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step3" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="accordion-step3">
                <div className="flex items-center gap-4 text-left">
                  <div className="rounded-full bg-hostplus-yellow/20 p-3">
                    <Target className="h-6 w-6 text-hostplus-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 3: See Your Results</p>
                    <p className="text-sm text-muted-foreground">Compare against ASFA standards and age pension</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 text-muted-foreground">
                View your estimated retirement cost of living and see how it compares to the ASFA Retirement Standard 
                (comfortable and modest lifestyles) and the full age pension. Adjust the percentage to account for reduced 
                work-related expenses in retirement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step4" className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="accordion-step4">
                <div className="flex items-center gap-4 text-left">
                  <div className="rounded-full bg-hostplus-yellow/20 p-3">
                    <FileCheck className="h-6 w-6 text-hostplus-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 4: Take Action</p>
                    <p className="text-sm text-muted-foreground">Save your results and explore next steps</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 text-muted-foreground">
                Generate a PDF report of your results to save or print. Then use our Retirement Projection Calculator 
                to see if your super and savings are on track to meet your retirement income needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              This calculator provides guidance based on your current circumstances. Results should be reviewed periodically, 
              especially if retirement is more than a few years away.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
