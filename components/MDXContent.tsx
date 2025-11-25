'use client';

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

const useMDXComponent = (code: string) => {
  try {
    // Velite generates code where:
    // - const{Fragment,jsx,jsxs}=arguments[0] destructures the runtime
    // - The code returns {default: ComponentFunction}
    // We execute this code with proper 'arguments' binding

    const fn = new Function('_mdx_runtime', `
      return (function() {
        const arguments = [_mdx_runtime];
        ${code}
      }).apply(this, [_mdx_runtime])
    `);

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
