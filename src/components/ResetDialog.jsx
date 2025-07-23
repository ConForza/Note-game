import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function ResetDialog({
  isDialogOpen,
  handleDialog,
  noteSettings,
  handleHighScore,
}) {
  return (
    <div className={noteSettings.isDarkMode ? "dark" : ""}>
      <Dialog
        open={isDialogOpen}
        onClose={() => handleDialog(false)}
        className={`relative z-50 ${noteSettings.isDarkMode ? "dark" : ""}`}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-orange-100 dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 p-12">
            <DialogTitle className="font-bold">Reset Scores</DialogTitle>
            <Description>
              This will reset your High Score. Do you want to continue?
            </Description>
            <div className="flex gap-4">
              <button
                className="restart-btn bg-gray-300 text-gray-800 px-6 py-1 mt-8 rounded-lg shadow-lg hover:bg-gray-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 transition"
                onClick={() => {
                  handleHighScore("reset");
                  localStorage.removeItem("noteGameHighScore");
                  handleDialog(false);
                }}
              >
                OK
              </button>
              <button
                className="restart-btn bg-gray-300 text-gray-800 px-6 py-1 mt-8 rounded-lg shadow-lg hover:bg-gray-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 transition"
                onClick={() => handleDialog(false)}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default ResetDialog;
