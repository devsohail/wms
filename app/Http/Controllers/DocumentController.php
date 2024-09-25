<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::with('user')->latest()->get();
        return Inertia::render('Documents/Index', 
        [
            'documents' => $documents,
            'flash' => session('flash')
        ]);
    }

    public function create()
    {
        return Inertia::render('Documents/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,png,jpg,jpeg|max:2048',
        ]);

        $path = $request->file('file')->store('documents');

        $document = Document::create([
            'title' => $request->title,
            'file_path' => $path,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('documents.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Document uploaded successfully.'
        ]);
    }

    public function edit(Document $document)
    {
        $this->authorize('update', $document);
        return Inertia::render('Documents/Edit', ['document' => $document]);
    }

    public function update(Request $request, Document $document)
    {
        $this->authorize('update', $document);

        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,png,jpg,jpeg|max:2048',
        ]);

        $document->title = $request->title;

        if ($request->hasFile('file')) {
            Storage::delete($document->file_path);
            $path = $request->file('file')->store('documents');
            $document->file_path = $path;
        }

        $document->save();

        return redirect()->route('documents.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Document updated successfully.'
        ]);
    }

    public function destroy(Document $document)
    {
        $this->authorize('delete', $document);

        Storage::delete($document->file_path);
        $document->delete();

        return redirect()->route('documents.index')
        ->with('flash', 
        [
            'type' => 'success',
            'message' => 'Document deleted successfully.'
        ]);
    }

    public function download(Document $document)
    {
        return Storage::download($document->file_path, $document->title);
    }
}