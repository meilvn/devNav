export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: "未上传任何文件" });
  }
  const file: any = formData[0];

  // 2. 校验文件（类型和大小）
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, message: "文件大小超过 10MB 限制" });
  }
  if (!file.type || !ALLOWED_TYPES.includes(file.type)) {
    throw createError({ statusCode: 400, message: "不支持该文件类型" });
  }
  // 3. 生成唯一文件名并保存
  const storage = useStorage('uploads')
  const fileName = `${Date.now()}-${file.filename}`
  
  // setItemRaw 用于保存二进制数据
  await storage.setItemRaw(fileName, file.data)

  // 4. 返回图片的临时访问 URL
  // 注意：此 URL 依赖于 Nitro 的静态文件服务，生产环境可能需要调整
  const tempUrl = `/uploads/${fileName}` 
  return { tempUrl }
});
