function Card({ title }) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-3 mb-2 hover:shadow-md transition-shadow cursor-pointer">
        <p className="text-gray-800 text-sm">{title}</p>
      </div>
    );
  }