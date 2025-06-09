"use client";

import { useState, FormEvent, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { askKrishna, type AskKrishnaOutput } from "@/ai/flows/ask-krishna";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  Send,
  AlertCircle,
  Sparkles,
  Wand2,
  MessageCircleQuestion,
} from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedPromptsList = [
  "What is the nature of the self (Atman)?",
  "How can I find peace in a chaotic world?",
  "What is the path to true happiness?",
  "How should I deal with difficult relationships?",
  "What is the significance of selfless action (Karma Yoga)?",
];

export function AskKrishnaUI() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<AskKrishnaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder for any client-side only logic if needed in the future.
  }, []);

  const handlePromptSelect = (prompt: string) => {
    setQuestion(prompt);
    setResponse(null);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!question.trim()) {
      setError("Please articulate your query to Krishna.");
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const result = await askKrishna({ question });
      setResponse(result);
    } catch (e: any) {
      console.error(e);
      setError(
        e.message ||
          "An unexpected disturbance occurred. Krishna's wisdom could not be retrieved at this moment."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-6 bg-gradient-to-br from-primary to-accent text-primary-foreground dark:from-primary dark:to-secondary dark:text-primary-foreground">
          <div className="flex items-center space-x-3">
            <Wand2 className="h-7 w-7 text-current" />
            <div>
              <CardTitle className="text-xl sm:text-2xl font-semibold text-current">
                Converse with Krishna
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-primary-foreground/80 dark:text-primary-foreground/90">
                Pose your question and receive guidance inspired by the Bhagavad
                Gita.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question" className="text-base font-medium">
                Your Question
              </Label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="E.g., How can I overcome my fears and anxieties?"
                rows={4}
                className="text-base border-input focus:border-primary focus:ring-primary rounded-md shadow-sm"
                disabled={isLoading}
                aria-label="Your question for Krishna"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-base sm:text-lg py-3 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/80 dark:from-primary dark:to-secondary dark:text-primary-foreground dark:hover:from-primary/90 dark:hover:to-secondary/80 shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              Seek Guidance
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="p-6 bg-gradient-to-br from-card to-muted/10 dark:from-card dark:to-muted/20">
          <div className="flex items-center space-x-3">
            <MessageCircleQuestion className="h-6 w-6 text-accent dark:text-primary" />
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Need Inspiration?
            </CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base mt-1 text-muted-foreground">
            Select a prompt to begin your inquiry.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-2 flex flex-wrap gap-2 bg-card">
          {suggestedPromptsList.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePromptSelect(prompt)}
              disabled={isLoading}
              className="rounded-full text-foreground hover:text-accent-foreground border-accent/50 hover:border-accent hover:bg-accent dark:border-primary/50 dark:hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground shadow-sm transition-all duration-150 ease-in-out transform hover:scale-105"
            >
              {prompt}
            </Button>
          ))}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-primary/10 via-muted/10 to-accent/10 p-8 text-center animate-pulse_custom_gita dark:border-primary/50 dark:from-primary/20 dark:via-muted/20 dark:to-accent/20">
          <Loader2 className="mr-3 h-10 w-10 animate-spin text-primary dark:text-primary" />
          <p className="mt-3 text-lg text-muted-foreground">
            Krishna is contemplating your question...
          </p>
          <p className="mt-1 text-sm text-muted-foreground/80">
            Please be patient for the divine insight.
          </p>
        </div>
      )}

      {error && (
        <Alert
          variant="destructive"
          className="shadow-md rounded-lg bg-destructive/10 dark:bg-destructive/20 border-destructive/30 dark:border-destructive/50"
        >
          <AlertCircle className="h-5 w-5 text-destructive dark:text-destructive" />
          <AlertTitle className="font-semibold text-destructive dark:text-destructive">
            An Obstacle Arose
          </AlertTitle>
          <AlertDescription className="text-destructive/90 dark:text-destructive-foreground/90">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {response && (
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="p-6 bg-gradient-to-br from-accent to-secondary text-accent-foreground dark:from-accent dark:to-secondary dark:text-accent-foreground">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-7 w-7 text-current" />
              <CardTitle className="text-xl sm:text-2xl font-semibold text-current">
                Krishna's Wisdom
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-base sm:text-lg leading-relaxed text-foreground bg-card">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p className="mb-4 last:mb-0" {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-2xl sm:text-3xl font-bold mt-6 mb-3 text-primary dark:text-primary"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-xl sm:text-2xl font-semibold mt-5 mb-2 text-primary dark:text-primary"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-primary dark:text-primary"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-accent dark:border-primary bg-muted/70 dark:bg-muted/50 p-4 italic my-6 text-foreground/80 dark:text-foreground/90 rounded-r-md"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-inherit" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic text-inherit" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-accent dark:text-primary hover:underline"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-muted dark:bg-muted/50 p-3 my-4 rounded-md overflow-x-auto text-sm sm:text-[0.9rem] leading-relaxed text-foreground/90 dark:text-foreground"
                    {...props}
                  />
                ),
                code: ({
                  node,
                  inline,
                  className: langClassName,
                  children,
                  ...props
                }) => {
                  return !inline ? (
                    <code
                      className={cn("font-mono text-inherit", langClassName)}
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      className="bg-muted dark:bg-muted/50 px-1.5 py-1 rounded-sm font-mono text-[0.9em] text-foreground/90 dark:text-foreground"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                hr: ({ node, ...props }) => (
                  <hr className="my-6 border-border" {...props} />
                ),
              }}
            >
              {response.answer}
            </ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
