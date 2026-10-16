export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome to your NewaNext admin panel.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Services", value: "0" },
          { title: "Products", value: "0" },
          { title: "Courses", value: "0" },
          { title: "Messages", value: "0" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {item.title}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}