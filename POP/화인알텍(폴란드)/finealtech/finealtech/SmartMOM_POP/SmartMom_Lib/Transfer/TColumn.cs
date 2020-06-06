using System;
using System.Collections.Generic;
using System.Data;
using System.Runtime.Serialization;

namespace SmartMom_Lib
{
    [DataContract]
    public class TColumn
    {
        [DataMember]
        public string ColumnId { get; set; }
        [DataMember]
        public string DataType { get; set; }

        [DataMember]
        public List<object> ColumnData { get; set; }

        public TColumn() { }

        public DataColumn MakeColumn()
        {
            DataColumn col = new DataColumn();
            col.ColumnName = ColumnId.ToUpper();
            switch( DataType)
            {
                case "INT":
                    col.DataType = typeof(int);
                    break;
                case "LONG":
                case "BIGDECIMAL":
                    col.DataType = typeof(double);
                    break;
                case "BOOL":
                    col.DataType = typeof(bool);
                    break;
                case "FLOAT":
                    col.DataType = typeof(float);
                    break;
                case "DOUBLE":
                    col.DataType = typeof(double);
                    break;
                case "DATE":
                case "TIME":
                case "DATETIME":
                    col.DataType = typeof(DateTime);
                    break;
                default:
                    col.DataType = typeof(string);
                    break;
            }
            return col;
        }

    }
}
