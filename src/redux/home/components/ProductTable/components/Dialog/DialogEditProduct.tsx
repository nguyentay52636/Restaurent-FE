import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, Upload } from 'lucide-react';
import { ProductType } from '@/lib/apis/types.';

interface ProductWithId extends ProductType {
    id: number;
}

interface DialogEditProductProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    editProduct: ProductWithId | null;
    onEditProductChange: (product: ProductWithId | null) => void;
    onSaveEdit: () => Promise<void>;
    isLoading?: boolean;
}

const DialogEditProduct: React.FC<DialogEditProductProps> = ({
    isOpen,
    onOpenChange,
    editProduct,
    onEditProductChange,
    onSaveEdit
}) => {
    const [imageTab, setImageTab] = useState<'url' | 'upload'>('url');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editProduct) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a URL for the file
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            onEditProductChange({ ...editProduct, image: imageUrl });
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        onEditProductChange({ ...editProduct, image: url });
        setPreviewImage(url);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-md p-6 bg-white rounded-lg shadow-lg'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-bold text-gray-900'>Chỉnh Sửa Sản Phẩm</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                    <div className='space-y-2'>
                        <Label htmlFor="edit-name" className='text-sm font-medium text-gray-700'>Tên Sản Phẩm</Label>
                        <Input
                            id="edit-name"
                            value={editProduct.name}
                            onChange={(e) => onEditProductChange({ ...editProduct, name: e.target.value })}
                            placeholder="Nhập tên sản phẩm"
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="edit-description" className='text-sm font-medium text-gray-700'>Mô tả</Label>
                        <Input
                            id="edit-description"
                            value={editProduct.description}
                            onChange={(e) => onEditProductChange({ ...editProduct, description: e.target.value })}
                            placeholder="Nhập mô tả sản phẩm"
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="edit-category" className='text-sm font-medium text-gray-700'>Danh Mục</Label>
                        <Select
                            value={editProduct.categoryId.toString()}
                            onValueChange={(value) =>
                                onEditProductChange({ ...editProduct, categoryId: parseInt(value) })
                            }
                        >
                            <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm cursor-pointer">
                                <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1" className="cursor-pointer">Cà Phê</SelectItem>
                                <SelectItem value="2" className="cursor-pointer">Trà</SelectItem>
                                <SelectItem value="3" className="cursor-pointer">Đồ Ăn</SelectItem>
                                <SelectItem value="4" className="cursor-pointer">Tráng Miệng</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="edit-price" className='text-sm font-medium text-gray-700'>Giá</Label>
                        <Input
                            id="edit-price"
                            type="number"
                            value={editProduct.price}
                            onChange={(e) => onEditProductChange({ ...editProduct, price: parseFloat(e.target.value) })}
                            placeholder="Nhập giá"
                            className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm"
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div className='space-y-3'>
                        <Label className='text-sm font-medium text-gray-700'>Hình ảnh sản phẩm</Label>

                        <Tabs defaultValue="url" value={imageTab} onValueChange={(value) => setImageTab(value as 'url' | 'upload')} className="w-full">
                            <TabsList className="grid grid-cols-2 mb-2">
                                <TabsTrigger value="url" className="flex items-center gap-1 cursor-pointer">
                                    <Link className="h-4 w-4" /> URL
                                </TabsTrigger>
                                <TabsTrigger value="upload" className="flex items-center gap-1 cursor-pointer">
                                    <Upload className="h-4 w-4" /> Tải lên
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="url" className="mt-2">
                                <Input
                                    id="edit-image"
                                    value={editProduct.image}
                                    onChange={handleUrlChange}
                                    placeholder="Nhập đường dẫn hình ảnh"
                                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm"
                                />
                            </TabsContent>

                            <TabsContent value="upload" className="mt-2">
                                <div className="flex flex-col items-center justify-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={triggerFileInput}
                                        className="w-full h-24 border-dashed border-2 border-gray-300 hover:border-orange-500 flex flex-col items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Upload className="h-6 w-6 text-gray-400" />
                                        <span className="text-sm text-gray-500">Chọn ảnh từ máy tính</span>
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Image Preview */}
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-200">
                                <img
                                    src={previewImage || editProduct.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/F5F5F5/CCCCCC?text=No+Image';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Select
                            value={editProduct.status}
                            onValueChange={(value) =>
                                onEditProductChange({ ...editProduct, status: value })
                            }
                        >
                            <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm cursor-pointer">
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active" className="cursor-pointer">Còn hàng</SelectItem>
                                <SelectItem value="inactive" className="cursor-pointer">Hết hàng</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={onSaveEdit}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-sm transition-colors duration-200 cursor-pointer"
                    >
                        Lưu Thay Đổi
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEditProduct;
