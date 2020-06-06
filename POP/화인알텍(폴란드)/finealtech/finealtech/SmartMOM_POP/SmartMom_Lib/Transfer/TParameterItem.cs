using System.Runtime.Serialization;

namespace SmartMom_Lib
{
    [DataContract]
    public class TParameterItem
    {
        [DataMember]
        public string ColumnId { get; set; }
        [DataMember]
        public string DataType { get; set; }
        [DataMember]
        public string ColumnData { get; set; }

        private TParameterItem()
        {
            DataType = DATATYPE.VARCHAR.ToString();
        }


        public TParameterItem(string columnId, DATATYPE dataType = DATATYPE.VARCHAR)
        {
            ColumnId = columnId;
            DataType = dataType.ToString();
            ColumnData = "";
        }


        public TParameterItem(string columnId, DATATYPE dataType, object columnData) : this(columnId, dataType)
        {
            ColumnData = columnData == null ? "" : columnData.ToString();
        }

        public void AddData(object columnData)
        {
            
        }

    }
}
