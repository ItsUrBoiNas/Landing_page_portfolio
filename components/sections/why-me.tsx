"use client";

import { motion } from "framer-motion";
import { Zap, Palette, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Speed",
    description: "I work fast. You launch sooner.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "It looks good. It builds trust.",
  },
  {
    icon: TrendingUp,
    title: "Conversion",
    description: "It sells. You make ROI.",
  },
];

export default function WhyMe() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Why Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" hover className="h-full">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4 mx-auto"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl mb-2">{feature.title}.</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-center text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}












