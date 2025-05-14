/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion'

export default function LinksSkeleton() {
  return (
    <div className='space-y-3'>
      {[...Array.from({ length: 5 })].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className='flex items-start justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-6 rounded-full bg-neutral-200 animate-pulse' />
              <div className='h-8 w-32 bg-neutral-200 rounded-md animate-pulse' />
            </div>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-16 bg-neutral-200 rounded-full animate-pulse' />
              <div className='h-8 w-8 bg-neutral-200 rounded-md animate-pulse' />
            </div>
          </div>

          <div className='pl-8 space-y-2'>
            <div className='h-4 w-3/4 bg-neutral-200 rounded animate-pulse' />
            <div className='h-5 w-20 bg-neutral-200 rounded-full animate-pulse' />
          </div>

          <div
            className='absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]'
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
