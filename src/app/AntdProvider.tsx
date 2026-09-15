import { useState, type ReactNode } from 'react';
import { ConfigProvider, type ThemeConfig } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

export function AntdProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<ThemeConfig>(() => {
    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();
    return {
      components: {
        DatePicker: { cellWidth: 36, cellHeight: 24, textHeight: 40 },
      },
      token: {
        colorPrimary: token('--color-green'),
        colorText: token('--color-ink'),
        colorTextPlaceholder: token('--color-muted'),
        colorBorder: token('--color-line'),
        colorError: token('--color-error'),
        colorBgContainer: token('--color-canvas'),
        fontFamily: token('--font-body'),
        fontSize: 16,
        borderRadius: 4,
        controlHeight: 47,
      },
    };
  });

  return (
    <StyleProvider layer>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </StyleProvider>
  );
}
