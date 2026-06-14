import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AppHeader, AppFooter } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { getModuleActions, getModuleLabel, MODULES } from "@/lib/modules";
import { getUser, hasModule, type ModuleId } from "@/lib/auth";
import { PurchaseRequisitionDialog } from "@/components/PurchaseRequisitionDialog";
import { PlaceholderDialog } from "@/components/PlaceholderDialog";
import { PurchaseOrderDialog } from "@/components/PurchaseOrderDialog";
import { MRREntryDialog } from "@/components/MRREntryDialog";
import { StockMasterDialog } from "@/components/StockMasterDialog";
import { StockLedgerDialog } from "@/components/StockLedgerDialog";
import { IssueDialog } from "@/components/IssueDialog";
import { ProductionPlanDialog } from "@/components/ProductionPlanDialog";
import { BOMMasterDialog } from "@/components/BOMMasterDialog";
import { WorkOrderDialog } from "@/components/WorkOrderDialog";
import { FinishedGoodsDialog } from "@/components/FinishedGoodsDialog";
import { DispatchDialog } from "@/components/DispatchDialog";

export function ModulePage() {
  const { moduleId } = useParams();
  const id = moduleId as ModuleId;
  const navigate = useNavigate();
  const user = getUser();
  const actions = getModuleActions(id);
  const label = getModuleLabel(id);

  const [prOpen, setPrOpen] = useState(false);
  const [poOpen, setPoOpen] = useState(false);
  const [mrrOpen, setMrrOpen] = useState(false);
  const [stockMasterOpen, setStockMasterOpen] = useState(false);
  const [stockLedgerOpen, setStockLedgerOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [productionPlanOpen, setProductionPlanOpen] = useState(false);
  const [bomMasterOpen, setBomMasterOpen] = useState(false);
  const [workOrderOpen, setWorkOrderOpen] = useState(false);
  const [finishedGoodsOpen, setFinishedGoodsOpen] = useState(false);
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState<string | null>(null);

  if (!MODULES.some((module) => module.id === id) || !hasModule(user, id)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <div className="bg-[var(--erp-banner)] px-4 py-2 text-sm font-medium border-b border-[oklch(0.7_0.1_90)]">
        Welcome to Factory ERP : &amp; {label} Module [ Branch : MAIN PLANT ]
      </div>
      <main className="flex-1 bg-[oklch(0.96_0.005_230)] p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-4 gap-y-6 max-w-[1100px]">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                onClick={() => {
                  if (a.action === "exit") navigate("/dashboard");
                  else if (a.action === "pr") setPrOpen(true);
                  else if (a.action === "po") setPoOpen(true);
                  else if (a.action === "mrr") setMrrOpen(true);
                  else if (a.action === "stock-master") setStockMasterOpen(true);
                  else if (a.action === "stock-ledger") setStockLedgerOpen(true);
                  else if (a.action === "issue") setIssueOpen(true);
                  else if (a.action === "production-plan") setProductionPlanOpen(true);
                  else if (a.action === "bom-master") setBomMasterOpen(true);
                  else if (a.action === "work-order") setWorkOrderOpen(true);
                  else if (a.action === "finished-goods") setFinishedGoodsOpen(true);
                  else if (a.action === "dispatch") setDispatchOpen(true);
                  else setPlaceholder(a.label);
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 bg-[var(--erp-tile)] border border-border rounded shadow-sm flex items-center justify-center group-hover:border-primary group-hover:shadow-md transition">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs text-center leading-tight max-w-[88px]">{a.label}</span>
              </button>
            );
          })}
        </div>

        <div className="pt-10">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Modules
          </Button>
        </div>
      </main>
      <AppFooter note={`** ${label} **`} />

      <PurchaseRequisitionDialog open={prOpen} onOpenChange={setPrOpen} />
      <PurchaseOrderDialog open={poOpen} onOpenChange={setPoOpen} />
      <MRREntryDialog open={mrrOpen} onOpenChange={setMrrOpen} />
      <StockMasterDialog open={stockMasterOpen} onOpenChange={setStockMasterOpen} />
      <StockLedgerDialog open={stockLedgerOpen} onOpenChange={setStockLedgerOpen} />
      <IssueDialog open={issueOpen} onOpenChange={setIssueOpen} />
      <ProductionPlanDialog open={productionPlanOpen} onOpenChange={setProductionPlanOpen} />
      <BOMMasterDialog open={bomMasterOpen} onOpenChange={setBomMasterOpen} />
      <WorkOrderDialog open={workOrderOpen} onOpenChange={setWorkOrderOpen} />
      <FinishedGoodsDialog open={finishedGoodsOpen} onOpenChange={setFinishedGoodsOpen} />
      <DispatchDialog open={dispatchOpen} onOpenChange={setDispatchOpen} />
      <PlaceholderDialog
        open={!!placeholder}
        onOpenChange={(v) => !v && setPlaceholder(null)}
        title={placeholder ?? ""}
      />
    </div>
  );
}