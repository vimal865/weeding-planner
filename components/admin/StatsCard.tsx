import { cn }  from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Props {
  label:     string
  value:     string | number
  sub?:      string
  icon:      React.ElementType
  iconBg:    string
  iconColor: string
  trend?:    number   // percentage change, positive = up, negative = down
  className?: string
}

export function StatsCard({ label, value, sub, icon: Icon, iconBg, iconColor, trend, className }: Props) {
  const trendPositive = trend !== undefined && trend > 0
  const trendNegative = trend !== undefined && trend < 0

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 p-5 shadow-sm', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
          <Icon size={20} className={iconColor} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            trendPositive ? 'bg-green-50 text-green-600' : trendNegative ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400',
          )}>
            {trendPositive ? <TrendingUp size={11} /> : trendNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-800 font-serif">{value}</p>
        <p className="text-sm font-medium text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
