import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060D09] flex items-center justify-center p-6">
          <div className="max-w-[480px] w-full p-8 rounded-[28px] bg-[rgba(13,24,18,0.55)] backdrop-blur-2xl border border-white/[0.08] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <div>
              <h2 className="text-white text-[22px] font-bold mb-2">
                Runtime Exception Caught
              </h2>
              <p className="text-white/60 text-[14px] leading-relaxed">
                The ADBMS rendering engine encountered an unrecoverable error. 
                This has been logged to the distributed error buffer.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 font-mono text-[11px] text-red-300 text-left overflow-auto max-h-[120px]">
              {this.state.error?.message || 'Unknown error'}
            </div>

            <button
              onClick={this.handleReset}
              className="h-[48px] px-8 bg-[#22C55E] rounded-[14px] text-[#05210E] text-[15px] font-bold transition-all hover:bg-[#16A34A] hover:shadow-[0_0_24px_rgba(34,197,94,0.4)] flex items-center gap-2 mx-auto active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restart Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
