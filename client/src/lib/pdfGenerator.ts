import jsPDF from 'jspdf';

interface PDFData {
  weeklyAmount: number;
  yearlyAmount: number;
  percentage: number;
  isCouple: boolean;
  isHomeOwner: boolean;
  yearsToRetirement: string;
  asfaComfortable: number;
  asfaModest: number;
  agePension: number;
}

export async function generateRetirementPDF(data: PDFData): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Header with Hostplus branding
  pdf.setFillColor(0, 48, 135); // Hostplus Navy
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Retirement Cost of Living', margin, 20);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Snapshot Report', margin, 30);

  // Date
  const currentDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  pdf.setFontSize(10);
  pdf.text(currentDate, pageWidth - margin - 40, 30);

  yPosition = 55;
  pdf.setTextColor(0, 0, 0);

  // Your Details
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Your Details', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Planning as: ${data.isCouple ? 'Couple' : 'Single'}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Home ownership: ${data.isHomeOwner ? 'Home owner' : 'Renter'}`, margin, yPosition);
  yPosition += 6;
  const retirementText = data.yearsToRetirement === '<5' ? 'Less than 5 years' : 
                         data.yearsToRetirement === '5-10' ? '5-10 years' : 'More than 10 years';
  pdf.text(`Years to retirement: ${retirementText}`, margin, yPosition);
  yPosition += 15;

  // Cost of Living Summary
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Your Estimated Cost of Living in Retirement', margin, yPosition);
  yPosition += 10;

  // Weekly and Yearly boxes
  const boxWidth = (pageWidth - 3 * margin) / 2;
  const boxHeight = 25;
  
  // Weekly box
  pdf.setFillColor(255, 209, 0); // Hostplus Yellow
  pdf.roundedRect(margin, yPosition, boxWidth, boxHeight, 3, 3, 'F');
  pdf.setTextColor(0, 48, 135);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Weekly', margin + 5, yPosition + 8);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`$${data.weeklyAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
           margin + 5, yPosition + 18);

  // Yearly box
  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(margin + boxWidth + margin, yPosition, boxWidth, boxHeight, 3, 3, 'F');
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Annual', margin + boxWidth + margin + 5, yPosition + 8);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`$${data.yearlyAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
           margin + boxWidth + margin + 5, yPosition + 18);

  yPosition += boxHeight + 15;

  // Percentage adjustment note
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Retirement lifestyle adjustment: ${data.percentage}% of current cost of living`, margin, yPosition);
  yPosition += 12;

  // Benchmark Comparison
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Benchmark Comparison', margin, yPosition);
  yPosition += 10;

  // Create comparison table
  const benchmarks = [
    { name: 'Your Estimate', value: data.yearlyAmount, color: [255, 209, 0] },
    { name: 'ASFA Comfortable', value: data.asfaComfortable, color: [0, 48, 135] },
    { name: 'ASFA Modest', value: data.asfaModest, color: [102, 153, 204] },
    { name: 'Full Age Pension', value: data.agePension, color: [76, 175, 80] },
  ];

  const maxValue = Math.max(...benchmarks.map(b => b.value));
  const barMaxWidth = pageWidth - 2 * margin - 60;

  benchmarks.forEach((benchmark) => {
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(benchmark.name, margin, yPosition);
    
    const barWidth = (benchmark.value / maxValue) * barMaxWidth;
    pdf.setFillColor(benchmark.color[0], benchmark.color[1], benchmark.color[2]);
    pdf.roundedRect(margin + 60, yPosition - 4, barWidth, 6, 2, 2, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(`$${benchmark.value.toLocaleString('en-AU')}`, margin + 60 + barWidth + 5, yPosition);
    
    yPosition += 12;
  });

  yPosition += 10;

  // Understanding the Benchmarks
  if (yPosition > 250) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Understanding the Benchmarks', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ASFA Comfortable', margin, yPosition);
  yPosition += 5;
  pdf.setFont('helvetica', 'normal');
  const comfortableText = `$${data.asfaComfortable.toLocaleString()} per year for ${data.isCouple ? 'a couple' : 'a single person'}. Covers private health insurance, regular dining out, domestic and occasional international travel, and a good standard of living.`;
  const comfortableLines = pdf.splitTextToSize(comfortableText, pageWidth - 2 * margin);
  pdf.text(comfortableLines, margin, yPosition);
  yPosition += comfortableLines.length * 5 + 5;

  pdf.setFont('helvetica', 'bold');
  pdf.text('ASFA Modest', margin, yPosition);
  yPosition += 5;
  pdf.setFont('helvetica', 'normal');
  const modestText = `$${data.asfaModest.toLocaleString()} per year for ${data.isCouple ? 'a couple' : 'a single person'}. Covers basic health cover, limited leisure and travel, and essential needs. Better than relying on the Age Pension alone.`;
  const modestLines = pdf.splitTextToSize(modestText, pageWidth - 2 * margin);
  pdf.text(modestLines, margin, yPosition);
  yPosition += modestLines.length * 5 + 5;

  pdf.setFont('helvetica', 'bold');
  pdf.text('Full Age Pension', margin, yPosition);
  yPosition += 5;
  pdf.setFont('helvetica', 'normal');
  const pensionText = `$${data.agePension.toLocaleString()} per year for ${data.isCouple ? 'a couple' : 'a single person'}${!data.isHomeOwner ? ' including maximum rent assistance' : ''}. The maximum government support available, subject to income and asset tests.`;
  const pensionLines = pdf.splitTextToSize(pensionText, pageWidth - 2 * margin);
  pdf.text(pensionLines, margin, yPosition);
  yPosition += pensionLines.length * 5 + 15;

  // Next Steps
  if (yPosition > 240) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Next Steps', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const nextStepsText = `You've calculated your retirement cost of living. Now see how you're tracking by using the Hostplus Retirement Projection Calculator to estimate how your super and other savings stack up against your future income needs.`;
  const nextStepsLines = pdf.splitTextToSize(nextStepsText, pageWidth - 2 * margin);
  pdf.text(nextStepsLines, margin, yPosition);
  yPosition += nextStepsLines.length * 5 + 10;

  pdf.setTextColor(0, 48, 135);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Visit: hostplus.com.au/members/retirement/forms-and-resources/super-calculator', margin, yPosition);

  // Footer
  const footerY = pdf.internal.pageSize.getHeight() - 15;
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.setFont('helvetica', 'normal');
  pdf.text('This calculator provides general guidance only and should be reviewed periodically.', margin, footerY);
  pdf.text('Data sources: ASFA Retirement Standard (June 2025), Services Australia (September 2025)', margin, footerY + 5);

  // Save the PDF
  pdf.save(`Retirement-Cost-of-Living-${currentDate.replace(/\s/g, '-')}.pdf`);
}
