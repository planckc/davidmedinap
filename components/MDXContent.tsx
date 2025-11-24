'use client';

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MDXProps) {
  const Component = useMemo(() => useMDXComponent(code), [code]);
  return <Component components={components} />;
}
