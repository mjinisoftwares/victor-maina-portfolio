"use client";

import { Suspense, useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlockContent } from "@/lib/types/content";

function CodeBlockInner({ codeBlock }: { codeBlock?: CodeBlockContent }) {
  const files = codeBlock?.files ?? [];
  const [activeFile, setActiveFile] = useState(files[0]?.id || "");
  const [htmls, setHtmls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!files.length) return;
    
    // Set first active file if not set
    if (!activeFile && files[0]?.id) {
      setActiveFile(files[0].id);
    }

    async function highlight() {
      const newHtmls: Record<string, string> = {};
      for (const file of files) {
        newHtmls[file.id] = await codeToHtml(file.code, {
          lang: file.language || "tsx",
          themes: {
            light: "github-light",
            dark: "github-dark-default",
          },
        });
      }
      setHtmls(newHtmls);
    }
    highlight();
  }, [files, activeFile]);

  if (!files.length) return null;

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-20">
      <div className="w-full max-w-4xl rounded-lg border border-border/70 bg-muted/70 p-1 pt-0">
        <Tabs value={activeFile} onValueChange={setActiveFile}>
          <TabsList
            className={cn(
              "items-end gap-2 rounded-none bg-transparent ps-2 pt-0.5 pb-0 overflow-x-auto w-full justify-start",
              "*:rounded-none *:border-0 *:border-b-2 *:text-muted-foreground",
              "*:data-[state=active]:border-foreground *:data-[state=active]:bg-transparent *:data-[state=active]:text-foreground *:data-[state=active]:shadow-none!"
            )}
          >
            {files.map((f) => (
              <TabsTrigger key={f.id} value={f.id}>
                {f.filename}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div
          className={cn(
            "grid",
            "[&>pre]:overflow-auto [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-border/70 [&>pre]:p-6 [&>pre]:text-sm [&>pre]:leading-[1.6] [&>pre]:shadow-2xs/2 dark:[&>pre]:border-border/80 [&>pre]:max-h-[600px]"
          )}
          dangerouslySetInnerHTML={{ __html: htmls[activeFile] || "" }}
        />
      </div>
    </div>
  );
}

export default function CodeBlock({ codeBlock }: { codeBlock?: CodeBlockContent }) {
  return (
    <Suspense>
      <CodeBlockInner codeBlock={codeBlock} />
    </Suspense>
  );
}
