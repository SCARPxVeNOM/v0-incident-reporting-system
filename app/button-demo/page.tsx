"use client"

import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-black uppercase tracking-tight">HAWKEYE</h1>
          <h2 className="text-2xl font-bold text-black">Neobrutalism Button Components</h2>
        </div>

        <div className="bg-white border-4 border-black p-8 space-y-8"
          style={{
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
          }}
        >
          {/* Default Variants */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase">Default Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Color Variants */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase">Color Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="cyan">Cyan</Button>
              <Button variant="yellow">Yellow</Button>
              <Button variant="purple">Purple</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Item
              </Button>
              <Button variant="outline">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Delete
              </Button>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase">Disabled State</h3>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase">Interactive Demo</h3>
            <p className="text-black font-medium">
              Hover over buttons to see the border disappear effect. Click to see the pressed state.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
              <Button variant="cyan" onClick={() => alert('Cyan button clicked!')}>Cyan Button</Button>
              <Button variant="purple" onClick={() => alert('Purple button clicked!')}>Purple Button</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


