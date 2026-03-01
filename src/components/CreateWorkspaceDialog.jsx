import { useState } from "react";
import { XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { addWorkspace } from "../features/workspaceSlice";
import { assets } from "../assets/assets";

const CreateWorkspaceDialog = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = `org_${Date.now()}`;
        dispatch(addWorkspace({
            id,
            name: formData.name,
            slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
            description: formData.description || null,
            settings: {},
            ownerId: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            image_url: assets.workspace_img_default,
            members: [],
            projects: [],
            owner: null,
        }));
        setFormData({ name: "", description: "" });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur flex items-center justify-center text-left z-50">
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-md text-zinc-900 dark:text-zinc-200 relative">
                <button className="absolute top-3 right-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200" onClick={onClose}>
                    <XIcon className="size-5" />
                </button>

                <h2 className="text-xl font-medium mb-4">Create Workspace</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Workspace Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter workspace name"
                            className="w-full px-3 py-2 rounded dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 mt-1 text-zinc-900 dark:text-zinc-200 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Optional description"
                            className="w-full px-3 py-2 rounded dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 mt-1 text-zinc-900 dark:text-zinc-200 text-sm h-20"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2 text-sm">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            Create Workspace
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWorkspaceDialog;
