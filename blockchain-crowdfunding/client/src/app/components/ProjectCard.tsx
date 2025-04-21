import Link from 'next/link';

export default function ProjectCard({
  title,
  description,
  goal,
  raised,
  imageUrl
}: {
  title: string;
  description: string;
  goal: string;
  raised: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-600 mb-2">{title} 🌈</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Raised: {raised} 💰</span>
            <span>Goal: {goal} 🎯</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${(parseFloat(raised) / parseFloat(goal)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Link 
          href="#"
          className="inline-block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition"
        >
          View Details 🔍
        </Link>
      </div>
    </div>
  );
}