import { Button, Upload } from 'antd';

/**
 * Кнопка импорта данных
 */
export const ImportButton = () => {
  const handleBeforeUpload = (file) => {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      const data = JSON.parse(fr.result);
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
      });
      window.location.reload();
    });

    fr.readAsText(file);
    return false;
  };
  return (
    <Upload fileList={[]} beforeUpload={handleBeforeUpload}>
      <Button>Импорт</Button>
    </Upload>
  );
};
