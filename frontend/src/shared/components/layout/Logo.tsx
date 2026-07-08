import { motion } from 'framer-motion';

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className="flex items-center gap-3 px-2">
      <motion.div
        layout
        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            fill="#D71920"
            stroke="#B51218"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7H17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col"
        >
          <span className="text-lg font-bold text-white tracking-tight leading-tight">
            MegaMarket
          </span>
          <span className="text-[10px] font-medium text-white/70 tracking-wider uppercase">
            ERP + CRM
          </span>
        </motion.div>
      )}
    </div>
  );
}
