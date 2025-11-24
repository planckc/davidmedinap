'use client';

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

const useMDXComponent = (code: string) => {
  try {
    // Wrap code in function that returns the component
    const fn = new Function('arguments', `return ${code}`);
    const result = fn(runtime);
    return result.default || result;
  } catch (error) {
    console.error('MDX compilation error:', error);
    return () => null;
  }
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MDXProps) {
  const Component = useMemo(() => useMDXComponent(code), [code]);
  return <Component components={components} />;
}
