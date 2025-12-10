import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check,
  RefreshCw,
  Image as ImageIcon,
  File,
  Grid,
  List,
  Search,
  X,
  Download,
  Eye,
  FolderPlus,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface MediaFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
}

const BUCKET_NAME = 'media';

export function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(currentFolder, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      const filesWithUrls: MediaFile[] = (data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => {
          const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);
          
          return {
            id: file.id || file.name,
            name: file.name,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            url: urlData.publicUrl,
            created_at: file.created_at || new Date().toISOString(),
          };
        });

      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  }, [currentFolder]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleUpload = async (uploadFiles: FileList | null) => {
    if (!uploadFiles || uploadFiles.length === 0) return;

    setUploading(true);
    const uploadPromises: Promise<any>[] = [];

    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = currentFolder ? `${currentFolder}/${fileName}` : fileName;

      uploadPromises.push(
        supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          })
      );
    }

    try {
      const results = await Promise.all(uploadPromises);
      const errors = results.filter(r => r.error);
      
      if (errors.length > 0) {
        console.error('Upload errors:', errors);
        alert(`${errors.length}개 파일 업로드 실패`);
      }
      
      fetchFiles();
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      const filePath = currentFolder ? `${currentFolder}/${fileName}` : fileName;
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) throw error;
      
      setDeleteConfirm(null);
      setSelectedFiles(prev => {
        const next = new Set(prev);
        next.delete(fileName);
        return next;
      });
      fetchFiles();
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return;
    
    const filePaths = Array.from(selectedFiles).map(name => 
      currentFolder ? `${currentFolder}/${name}` : name
    );

    try {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove(filePaths);

      if (error) throw error;
      
      setSelectedFiles(new Set());
      fetchFiles();
    } catch (error) {
      console.error('Bulk delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  const toggleSelect = (fileName: string) => {
    setSelectedFiles(prev => {
      const next = new Set(prev);
      if (next.has(fileName)) {
        next.delete(fileName);
      } else {
        next.add(fileName);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.name)));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const isImage = (type: string) => type.startsWith('image/');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">미디어 라이브러리</h1>
          <p className="text-gray-500 mt-1">이미지 및 파일을 관리합니다</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedFiles.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={18} />
              {selectedFiles.size}개 삭제
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <RefreshCw size={20} className="animate-spin" />
            ) : (
              <Upload size={20} />
            )}
            {uploading ? '업로드 중...' : '파일 업로드'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="파일명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Select All */}
          {files.length > 0 && (
            <button
              onClick={selectAll}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {selectedFiles.size === files.length ? '선택 해제' : '전체 선택'}
            </button>
          )}

          {/* Refresh */}
          <button
            onClick={fetchFiles}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative mb-6 ${dragActive ? 'block' : 'hidden'}`}
      >
        <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <Upload size={48} className="mx-auto text-blue-500 mb-2" />
            <p className="text-blue-600 font-medium">파일을 여기에 놓으세요</p>
          </div>
        </div>
      </div>

      {/* Empty State with Drop Zone */}
      {!loading && files.length === 0 && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`p-12 text-center border-2 border-dashed rounded-xl transition-colors ${
            dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
          }`}
        >
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">업로드된 파일이 없습니다</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            파일 업로드
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="p-8 text-center text-gray-500">
          <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
          불러오는 중...
        </div>
      )}

      {/* Grid View */}
      {!loading && files.length > 0 && viewMode === 'grid' && (
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`group relative bg-white rounded-xl border overflow-hidden transition-all ${
                selectedFiles.has(file.name) 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:shadow-lg'
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.name)}
                  onChange={() => toggleSelect(file.name)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
              </div>

              {/* Preview */}
              <div 
                className="aspect-square bg-gray-100 cursor-pointer"
                onClick={() => setPreviewFile(file)}
              >
                {isImage(file.type) ? (
                  <img 
                    src={file.url} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <File size={40} className="text-gray-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>

              {/* Actions - show on hover */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(file.url)}
                  className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-100"
                  title="URL 복사"
                >
                  {copiedUrl === file.url ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} className="text-gray-600" />
                  )}
                </button>
                <button
                  onClick={() => setDeleteConfirm(file.name)}
                  className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-red-50"
                  title="삭제"
                >
                  <Trash2 size={14} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!loading && files.length > 0 && viewMode === 'list' && (
        <div 
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedFiles.size === files.length}
                    onChange={selectAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">파일명</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden sm:table-cell">크기</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">업로드일</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.name)}
                      onChange={() => toggleSelect(file.name)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {isImage(file.type) ? (
                        <img src={file.url} alt="" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <File size={20} className="text-gray-400" />
                        </div>
                      )}
                      <span className="font-medium text-gray-900 truncate max-w-xs">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">
                    {formatFileSize(file.size)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                    {format(new Date(file.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setPreviewFile(file)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="미리보기"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(file.url)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="URL 복사"
                      >
                        {copiedUrl === file.url ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>
                      <a
                        href={file.url}
                        download
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="다운로드"
                      >
                        <Download size={18} />
                      </a>
                      <button
                        onClick={() => setDeleteConfirm(file.name)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="삭제"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewFile(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 truncate">{previewFile.name}</h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 bg-gray-100 flex items-center justify-center" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {isImage(previewFile.type) ? (
                <img 
                  src={previewFile.url} 
                  alt={previewFile.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center py-12">
                  <File size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">미리보기를 지원하지 않는 파일입니다.</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="mr-4">크기: {formatFileSize(previewFile.size)}</span>
                  <span>업로드: {format(new Date(previewFile.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(previewFile.url)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copiedUrl === previewFile.url ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    URL 복사
                  </button>
                  <a
                    href={previewFile.url}
                    download
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Download size={16} />
                    다운로드
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">파일 삭제</h3>
            <p className="text-gray-600 mb-6">
              <span className="font-medium">"{deleteConfirm}"</span> 파일을 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
