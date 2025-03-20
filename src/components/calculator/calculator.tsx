"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calculator as CalculatorIcon, Check } from 'lucide-react';

// Pricing definitions
const baseCosts = {
  Website: 200000,
  "Mobile App": 250000,
  "Web App": 300000,
};

const numPagesCosts = {
  "Up to 5": 0,
  "5-10": 50000,
  "10-20": 100000,
  "20+": 150000,
};

const designCosts = {
  "Basic UI": 0,
  "Custom UI": 50000,
  "Premium AI-Powered UI": 100000,
};

const featureCosts = {
  "E-commerce": 70000,
  "User Authentication": 40000,
  "Payment Gateway": 50000,
  "CRM Integration": 60000,
  "AI Chatbot": 75000,
  "API Integration": 65000,
};

const hostingCosts = {
  "Shared Hosting": 20000,
  VPS: 35000,
  "Cloud Infrastructure": 50000,
};

const supportCosts = {
  "3-Months": 20000,
  "6-Months": 30000,
  "12-Months": 50000,
};

export default function Calculator() {
  const [projectType, setProjectType] = useState<keyof typeof baseCosts | ''>('');
  const [numPages, setNumPages] = useState<keyof typeof numPagesCosts | ''>('');
  const [designType, setDesignType] = useState<keyof typeof designCosts | ''>('');
  const [features, setFeatures] = useState<(keyof typeof featureCosts)[]>([]);
  const [hosting, setHosting] = useState<keyof typeof hostingCosts | ''>('');
  const [support, setSupport] = useState<keyof typeof supportCosts | ''>('');
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (projectType && numPages && designType && hosting && support) {
      calculateCost();
    }
  }, [projectType, numPages, designType, features, hosting, support]);

  const calculateCost = () => {
    setIsCalculating(true);
    let cost = 0;

    if (projectType && baseCosts[projectType]) {
      cost += baseCosts[projectType];
    }
    if (numPages && numPagesCosts[numPages]) {
      cost += numPagesCosts[numPages];
    }
    if (designType && designCosts[designType]) {
      cost += designCosts[designType];
    }
    const featuresTotal = features.reduce((acc, feature) => acc + (featureCosts[feature] || 0), 0);
    cost += featuresTotal;
    if (hosting && hostingCosts[hosting]) {
      cost += hostingCosts[hosting];
    }
    if (support && supportCosts[support]) {
      cost += supportCosts[support];
    }

    setTimeout(() => {
      setTotalCost(cost);
      setIsCalculating(false);
    }, 500);
  };

  const toggleFeature = (feature: keyof typeof featureCosts) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-[#09090B] border-[#C3EA00]/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#C3EA00] flex items-center gap-2">
            <CalculatorIcon className="w-8 h-8" />
            Project Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label className="text-[#C3EA00] text-lg">Project Type</Label>
            <RadioGroup
              value={projectType}
              onValueChange={(value) => setProjectType(value as keyof typeof baseCosts)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {Object.keys(baseCosts).map((type) => (
                <div key={type} className="relative">
                  <RadioGroupItem
                    value={type}
                    id={type}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={type}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted/5 peer-data-[state=checked]:border-[#C3EA00] [&:has([data-state=checked])]:border-[#C3EA00] cursor-pointer"
                  >
                    <span className="text-[#C3EA00]">{type}</span>
                    <span className="text-sm text-muted-foreground">
                      ₹{baseCosts[type as keyof typeof baseCosts].toLocaleString('en-IN')}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className="bg-[#C3EA00]/20" />

          <div className="space-y-4">
            <Label className="text-[#C3EA00] text-lg">Number of Pages</Label>
            <Select value={numPages} onValueChange={(value) => setNumPages(value as keyof typeof numPagesCosts)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of pages" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(numPagesCosts).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-[#C3EA00]/20" />

          <div className="space-y-4">
            <Label className="text-[#C3EA00] text-lg">Design Type</Label>
            <Select value={designType} onValueChange={(value) => setDesignType(value as keyof typeof designCosts)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select design type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(designCosts).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-[#C3EA00]/20" />

          <div className="space-y-4">
            <Label className="text-[#C3EA00] text-lg">Features</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(featureCosts).map(([feature, cost]) => (
                <div
                  key={feature}
                  className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/5 transition-colors"
                >
                  <Checkbox
                    id={feature}
                    checked={features.includes(feature as keyof typeof featureCosts)}
                    onCheckedChange={() => toggleFeature(feature as keyof typeof featureCosts)}
                    className="border-[#C3EA00] data-[state=checked]:bg-[#C3EA00] data-[state=checked]:text-[#09090B]"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={feature}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {feature}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      ₹{cost.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-[#C3EA00]/20" />

          <div className="space-y-4">
            <Label className="text-[#C3EA00] text-lg">Hosting & Security</Label>
            <Select value={hosting} onValueChange={(value) => setHosting(value as keyof typeof hostingCosts)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select hosting type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(hostingCosts).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-[#C3EA00]/20" />

          <div className="space-y-4">
            <Label className="text-[#C3EA00] text-lg">Support & Maintenance</Label>
            <Select value={support} onValueChange={(value) => setSupport(value as keyof typeof supportCosts)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select support duration" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(supportCosts).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {totalCost !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-lg bg-[#C3EA00]/10 border border-[#C3EA00]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#C3EA00]">Estimated Total Cost</h3>
                  <p className="text-sm text-muted-foreground">
                    This is an approximate cost based on your selections
                  </p>
                </div>
                <div className="text-4xl font-bold text-[#C3EA00]">
                  ₹{totalCost.toLocaleString('en-IN')}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}