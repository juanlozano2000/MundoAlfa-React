export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import ExplorarContent from "./ExplorarContent";

export default function ExplorarPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-neutral-500">Cargando…</div>}>
      <ExplorarContent />
    </Suspense>
  );
}
