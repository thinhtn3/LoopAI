import { Link } from "react-router-dom";
import { useHomeTheme } from "@/context/HomeThemeContext";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { theme } = useHomeTheme();

  return (
    <footer 
      className="w-full border-t"
      style={{ 
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: theme.colors.accent }}
              />
              <h3 
                className="text-xl font-bold"
                style={{ color: theme.colors.text }}
              >
                LoopAI
              </h3>
            </div>
            <p 
              className="text-sm max-w-md leading-relaxed"
              style={{ color: theme.colors.muted }}
            >
              Practice technical interviews with AI-powered feedback. 
              Code in a real IDE environment and get instant guidance 
              to improve your interview skills.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: theme.colors.bg }}
              >
                <Github className="w-5 h-5" style={{ color: theme.colors.text }} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: theme.colors.bg }}
              >
                <Twitter className="w-5 h-5" style={{ color: theme.colors.text }} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: theme.colors.bg }}
              >
                <Linkedin className="w-5 h-5" style={{ color: theme.colors.text }} />
              </a>
              <a 
                href="mailto:hello@loopai.com" 
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: theme.colors.bg }}
              >
                <Mail className="w-5 h-5" style={{ color: theme.colors.text }} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{ color: theme.colors.text }}
            >
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/problems" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Practice Problems
                </Link>
              </li>
              <li>
                <Link 
                  to="/interview" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 
              className="font-semibold mb-4"
              style={{ color: theme.colors.text }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: theme.colors.muted }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: theme.colors.border }}
        >
          <p 
            className="text-sm"
            style={{ color: theme.colors.muted }}
          >
            © 2024 LoopAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link 
              to="/privacy" 
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: theme.colors.muted }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: theme.colors.muted }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: theme.colors.muted }}
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

