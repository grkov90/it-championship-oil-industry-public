import { NodeType } from './nodes';

export const dictionary = [
  {
    nodeType: NodeType.Money,
    name: 'Деньги',
    id: 200,
  },
  {
    nodeType: NodeType.NegativeEvent,
    name: 'Падение эффективности проходки',
    id: 1,
    calculateDamageMoneyText: ((waitTimeTargetChildSum) =>
      waitTimeTargetChildSum * 4260000).toString(),
  },
  {
    nodeType: NodeType.NegativeEvent,
    name: 'Перебур',
    id: 2,
    calculateDamageMoneyText: ((waitTimeTargetChildSum) => {
      if (waitTimeTargetChildSum > 0) {
        return 3750000;
      }
      return 0;
    }).toString(),
  },
  {
    nodeType: NodeType.NegativeEvent,
    name: 'Простой',
    id: 3,
    calculateDamageMoneyText: ((waitTimeTargetChildSum) =>
      waitTimeTargetChildSum * 12500000).toString(),
  },
  {
    nodeType: NodeType.BusinessProcess,
    name: 'Запрос информации по новой скважине',
    id: 10,
  },
  {
    nodeType: NodeType.BusinessProcess,
    name: 'Подготовка секторной модели',
    id: 11,
  },
  {
    nodeType: NodeType.BusinessProcess,
    name: 'Подготовка геонавигационного проекта',
    id: 12,
  },
  {
    nodeType: NodeType.BusinessProcess,
    name: 'Сопровождение мониторинга',
    id: 13,
  },
  {
    nodeType: NodeType.BusinessProcess,
    name: 'Завершение мониторинга',
    id: 14,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Плановая траектория',
    id: 100,
    rtoTarget: 72,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Маркшейдерская справка (привязка устья)',
    id: 101,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Целевой пласт',
    id: 102,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Экспорт скважин и скважинных данных БД',
    id: 103,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Экспорт поверхностей',
    id: 104,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Экспорт пластопересечений',
    id: 105,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт скважин и скважинных данных',
    id: 106,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт поверхностей',
    id: 107,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт пластопересечений',
    id: 108,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Составление корреляционных схем по скважинам окружения',
    id: 109,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт плановых целей',
    id: 110,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт плановой траектории',
    id: 111,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Проверка плановой траектории на выполнение геологических целей, геологическим построениям и оптимальности геометрии ствола',
    id: 112,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Настройка отображения планшетов и карт (для формирования отчетности)',
    id: 113,
    rtoTarget: 72,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Экспорт скважинных данных для геонавигационного проекта',
    id: 114,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Создание нового проекта в сетевой папке',
    id: 115,
    rtoTarget: 36,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Создание в проекте новых скважин',
    id: 116,
    rtoTarget: 36,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт данных по скважинам',
    id: 117,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Импорт структурных поверхностей и контуров',
    id: 118,
    rtoTarget: 72,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Настройка отображения планшетов и карт рабочей области (картожаных кривых ГИС, LWD и их граничных зачений, насыщения, литологии, траекторий, целевых точек и интервалов, элементов конструкции, пластопересечений, флюидальных контактов, структурных поверхностей)',
    id: 119,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Получение первых данных с буровой',
    id: 120,
    rtoTarget: 1,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Загрузка данных в профильное ПО',
    id: 121,
    rtoTarget: 1,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Геологическая привязка по корреляционной схеме в Petrel',
    id: 122,
    rtoTarget: 1,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Привязка фактического и синтетического каротажа в геонавигационном проекте Геонафт',
    id: 123,
    rtoTarget: 1,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Формирование оперативного отчета excel Сетевые папки',
    id: 124,
    rtoTarget: 72,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Формирование письма с рекомендацией на список рассылки MS Outlook Сопровождение мониторинга Непрерывное обработка (импорт в профильное ПО, обновление построений), поступающих данных',
    id: 125,
    rtoTarget: 1,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Рассылка обновленных рекомендаций',
    id: 126,
    rtoTarget: 10,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Архивирование электронной почты MS Outlook Подготовка финального отчета о проводке',
    id: 127,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Актирование скважин',
    id: 128,
    rtoTarget: 48,
  },
  {
    nodeType: NodeType.BusinessFunction,
    name: 'Обновление статистики по пробуренным скважинам',
    id: 129,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItService,
    name: 'MS Outlook работа с почтовыми сообщениями',
    id: 1001,
  },
  {
    nodeType: NodeType.ItService,
    name: 'ГеоБД работа пользователя с системой',
    id: 1002,
  },
  {
    nodeType: NodeType.ItService,
    name: 'Сетевые папки обращение к сетевым папкам пользователей',
    id: 1003,
  },
  {
    nodeType: NodeType.ItService,
    name: 'Petrel многопользовательская работа',
    id: 1004,
  },
  {
    nodeType: NodeType.ItService,
    name: 'Геонафт десктопное приложение',
    id: 1005,
  },
  {
    nodeType: NodeType.ItService,
    name: 'Связь с буровой',
    id: 1006,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Front-end сервер ГеоБД',
    id: 1101,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Back-end сервер ГеоБД',
    id: 1102,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервер баз данных ГеоБД',
    id: 1103,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Front-end сервер эл почты',
    id: 1104,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервер электронной почты',
    id: 1105,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервер электронной почты',
    id: 1106,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'SMTP-шлюзы',
    id: 1107,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервис DevSecOps',
    id: 1121,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервис точного времени',
    id: 1122,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Канал связи Кустовая площадка',
    id: 1108,
    rtoTarget: 16,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Инфраструктура сбора и передачи данных на буровой',
    id: 1109,
    rtoTarget: 16,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Рабочая станция пользователя',
    id: 1110,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Инфраструктура дисковой системы',
    id: 1112,
    rtoTarget: 12,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Анти-SPAM фильтры',
    id: 1113,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервис WINS',
    id: 1114,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Сервис DNS',
    id: 1115,
    rtoTarget: 4,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Служба AD компании (авторизация пользователей)',
    id: 1116,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Инфраструктура как сервис (Виртуализация)',
    id: 1111,
    rtoTarget: 16,
  },

  {
    nodeType: NodeType.ItResource,
    name: 'Сервис межсетевых экранов',
    id: 1117,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Инфраструктура обеспечения площадок и параметров окружающей среды',
    id: 1118,
    rtoTarget: 16,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Инфраструктура корпоративной локальной сети',
    id: 1119,
    rtoTarget: 8,
  },
  {
    nodeType: NodeType.ItResource,
    name: 'Система резервного копирования данных',
    id: 1120,
    rtoTarget: 8,
  },
];

export const tree1 = [
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 200,
    id: 9200,
    parents: [null],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1,
    id: 9001,
    parents: [9200],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 2,
    id: 9002,
    parents: [9200],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 3,
    id: 9003,
    parents: [9200],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 10,
    id: 9010,
    parents: [9001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 11,
    id: 9011,
    parents: [9001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 12,
    id: 9012,
    parents: [9001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 13,
    id: 9013,
    parents: [9002, 9003],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 14,
    id: 9014,
    parents: [9001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 100,
    id: 9100,
    parents: [9010],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 101,
    id: 9101,
    parents: [9010],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 102,
    id: 9102,
    parents: [9010],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 103,
    id: 9103,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 104,
    id: 9104,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 105,
    id: 9105,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 106,
    id: 9106,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 107,
    id: 9107,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 108,
    id: 9108,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 109,
    id: 9109,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 110,
    id: 9110,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 111,
    id: 9111,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 112,
    id: 9112,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 113,
    id: 9113,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 114,
    id: 9114,
    parents: [9011],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 115,
    id: 9115,
    parents: [9012],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 116,
    id: 9116,
    parents: [9012],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 117,
    id: 9117,
    parents: [9012],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 118,
    id: 9118,
    parents: [9012],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 119,
    id: 9119,
    parents: [9012],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 120,
    id: 9120,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 121,
    id: 9121,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 122,
    id: 9122,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 123,
    id: 9123,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 124,
    id: 9124,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 125,
    id: 9125,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 126,
    id: 9126,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 127,
    id: 9127,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 128,
    id: 9128,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 129,
    id: 9129,
    parents: [9013],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1001,
    id: 10001,
    parents: [9100, 9101, 9102, 9110, 9111, 9120, 9125, 9126, 9127],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1002,
    id: 10002,
    parents: [9103, 9105],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1003,
    id: 10003,
    parents: [9104, 9124, 9128, 9129],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1004,
    id: 10004,
    parents: [9106, 9107, 9108, 9109, 9112, 9113, 9114, 9121, 9122, 9125],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1005,
    id: 10005,
    parents: [9115, 9116, 9117, 9118, 9119, 9121, 9123, 9125],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1006,
    id: 10006,
    parents: [9120, 9125, 9126],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1101,
    id: 10101,
    parents: [10002],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1102,
    id: 10102,
    parents: [10002],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1103,
    id: 10103,
    parents: [10002],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1104,
    id: 10104,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1105,
    id: 10105,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1106,
    id: 10106,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1107,
    id: 10107,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1121,
    id: 10121,
    parents: [10002],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1122,
    id: 10122,
    parents: [10006],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1108,
    id: 10108,
    parents: [10001, 10122],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1109,
    id: 10109,
    parents: [10006],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1110,
    id: 10110,
    parents: [10002, 10003, 10004, 10005],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1112,
    id: 10112,
    parents: [10003, 10101, 10102, 10103, 10104, 10105, 10106],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1113,
    id: 10113,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1114,
    id: 10114,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1115,
    id: 10115,
    parents: [10001],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1116,
    id: 10116,
    parents: [10002, 10003],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1111,
    id: 10111,
    parents: [
      10001, 10002, 10003, 10004, 10101, 10102, 10103, 10104, 10105, 10106, 10107, 10113, 10114,
      10115, 10116, 10121,
    ],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1117,
    id: 10117,
    parents: [10001, 10002, 10003, 10004, 10005],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1118,
    id: 10118,
    parents: [10001, 10002, 10003, 10004, 10005, 10006],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1119,
    id: 10119,
    parents: [10001, 10002, 10003, 10004, 10005, 10006],
  },
  {
    faultTreeId: 1,
    faultTreeNodeDictonaryId: 1120,
    id: 10120,
    parents: [10001, 10002, 10003, 10004],
  },
];

export const trees = [
  {
    id: 1,
    name: 'Дерево 1',
  },
];

export const scenarios = [
  {
    id: 1,
    name: 'Частичный отказ\nОтказ системы резервного копирования',
    faultTreeId: 1,
  },
];

export const scenarioNodes = [
  {
    id: 1,
    scenarioId: 1,
    faultTreeNodeId: 10120,
    rtoTarget: 40,
  },
];

export function resetData() {
  if (!localStorage.getItem('faultTree')) {
    localStorage.setItem('faultTree', JSON.stringify(trees));
    localStorage.setItem('faultTreeNode', JSON.stringify(tree1));
    localStorage.setItem('faultTreeNodeDictionary', JSON.stringify(dictionary));
    localStorage.setItem('faultScenarioElement', JSON.stringify(scenarioNodes));
    localStorage.setItem('faultScenario', JSON.stringify(scenarios));
    window.location.reload();
  }
}
