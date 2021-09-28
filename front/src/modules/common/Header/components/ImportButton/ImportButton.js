import { Button, Upload } from 'antd';
import { reloadData } from '../../../../../services/local.service';

/**
 * Кнопка импорта данных
 */
export const ImportButton = () => {
  const handleBeforeUpload = (file) => {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      const data = JSON.parse(fr.result);
      reloadData(true, data);
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
