import { useNavigate } from "react-router";

const items = [
  { id: 'mc-001', title: 'Tablet Press', emoji: '💊' },
  { id: 'mc-002', title: 'Centrifugal Pump', emoji: '🚿' },
  { id: 'mc-003', title: 'Gas Turbine', emoji: '🌪️' },
  { id: 'mc-004', title: 'CNC Machine', emoji: '🛠️' },
  { id: 'mc-005', title: 'RO Unit', emoji: '💧' },
  { id: 'mc-007', title: 'Robotic Arm', emoji: '🤖' },
];

export function MainDashboard() {

  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    switch (id) {
      case 'mc-001': {
        navigate('/tabletpress');
        break;
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Simulation Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, _) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg hover:bg-blue-100 transition duration-300"
            onClick={() => handleItemClick(item.id)}
          >
            <div className="text-6xl mb-4">{item.emoji}</div>
            <div className="text-lg font-semibold text-gray-700">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}