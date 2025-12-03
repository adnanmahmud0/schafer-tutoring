"use client";
import React, { useState } from 'react';
import { Calendar, DollarSign, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function SupportPage() {
const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const supportCards = [
    {
      id: 1,
      icon: Calendar,
      title: 'Report incorrect bookings',
      description: 'or request lesson correction',
    },
    {
      id: 2,
      icon: DollarSign,
      title: 'Report issue with',
      description: 'with earnings and',
    },
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'How do I schedule a tutoring session?',
      answer: 'To schedule a tutoring session, navigate to the Sessions tab, click on "Schedule New Session", select your preferred date and time, choose the subject and student level, and confirm the booking. You will receive a confirmation email with all the details.',
    },
    {
      id: 'faq2',
      question: 'What if I need to cancel or reschedule a session?',
      answer: 'You can cancel or reschedule a session up to 24 hours before the scheduled time. Go to your Sessions page, find the session you want to modify, and click the "Cancel" or "Reschedule" button. If you cancel within 24 hours, you may be subject to a cancellation fee.',
    },
    {
      id: 'faq3',
      question: 'How do I access my online tutoring session?',
      answer: 'Once your session is scheduled, you will receive a unique session link via email. Click the link at the scheduled time to join the online session. Make sure you have a stable internet connection and a working microphone and camera.',
    },
    {
      id: 'faq4',
      question: 'What subjects are available for tutoring?',
      answer: 'We offer tutoring in a wide range of subjects including Mathematics, English, Science, History, Geography, Languages, and more. You can view the complete list of available subjects in the Subject Selection page during the booking process.',
    },
    {
      id: 'faq5',
      question: 'How does the subscription plan work?',
      answer: 'Our subscription plans offer flexible options for regular tutoring sessions. Choose from monthly or annual plans, which include a set number of hours per month. You can upgrade or downgrade your plan anytime, and unused hours roll over to the next month.',
    },
    {
      id: 'faq6',
      question: 'What if I\'m not satisfied with my tutor?',
      answer: 'If you\'re not satisfied with your tutor, you can request a change through your account settings. Contact our support team with specific feedback, and we\'ll help match you with a more suitable tutor at no additional cost.',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto space-y-8">

        {/* Info Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-900">
            For Questions outside the listed topics, a support chat is available in Messages
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white rounded-lg border border-gray-300 p-8 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <IconComponent className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openItems[faq.id]}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                    <span className="text-sm font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 shrink-0 ml-4 ${
                        openItems[faq.id] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-0">
                  <div className="bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}