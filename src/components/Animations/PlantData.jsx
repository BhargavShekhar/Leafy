export function LoadingAnimation() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-medium text-gray-700">Loading Plant Data</h3>
                <p className="text-gray-500">Discovering nature's wonders...</p>
            </div>
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
        </div>
    )
}