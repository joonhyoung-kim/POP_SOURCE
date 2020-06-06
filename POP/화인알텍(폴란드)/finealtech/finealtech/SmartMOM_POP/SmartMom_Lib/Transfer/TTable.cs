using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Collections.ObjectModel;
using System.Linq;
using System.Data;
using System.Collections;

namespace SmartMom_Lib
{
    [KnownType(typeof(TColumn))]
    public class TTable : Dictionary<string, Collection<TColumn>>
    {
        public TTable() { }
        /// <summary>
        /// 행데이터 변환
        /// </summary>
        /// <param name="tableName"></param>
        /// <param name="row"></param>
        /// <returns></returns>
        public Dictionary<string, object> GenerateRow(string tableName, int colIndex)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            for (int row = 0; row < this[tableName].Count; row++)
            {
                dic[this[tableName][row].ColumnId] = this[tableName][row].ColumnData[colIndex];
            }
            return dic;
        }
        /// <summary>
        /// 테이블 변환
        /// </summary>
        /// <returns></returns>
        public ObservableCollection<Dictionary<string, object>> Parse(string tableName = "OUT_CUR0")
        {
            ObservableCollection<Dictionary<string, object>> table = new ObservableCollection<Dictionary<string, object>>();

            if (this[tableName].Count < 1)
            {
                return table;
            }

            for (int colIndex = 0; colIndex < this[tableName][0].ColumnData.Count; colIndex++)
            {
                table.Add(GenerateRow(tableName, colIndex));
            }
            return table;
        }
        ///// <summary>
        ///// 객체 변환
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <returns></returns>
        //public ObservableCollection<T> Parse<T>(string tableName = "OUT_CUR0")
        //{
        //    ObservableCollection<Dictionary<string, object>> table = Parse(tableName);
        //    if (table == null)
        //    {
        //        return null;
        //    }
        //    ObservableCollection<T> collection = new ObservableCollection<T>();
        //    for (int row = 0; row < table.Count; row++)
        //    {
        //        T item = ActivatorHelper.CreateInstanceUsingLamdaExpression<T>();
        //        ItemBase obj = item as ItemBase;
        //        if (obj == null)
        //        {
        //            continue;
        //        }

        //        // 데이터 결과 모두 파라메터로 관리
        //        IDictionaryEnumerator ie = table[row].GetEnumerator();
        //        while (ie.MoveNext())
        //        {
        //            DictionaryEntry de = ie.Entry;
        //            obj.Parameter[de.Key.ToString()] = de.Value;
        //        }

        //        obj.LoadProperty_Pre();
        //        obj.LoadProperty();

        //        collection.Add(item);
        //    }
        //    return collection;
        //}

        /// <summary>
        /// 데이터셋 변환
        /// </summary>
        /// <returns></returns>
        public DataSet ParseDataSet()
        {
            DataSet ds = new DataSet();

            foreach (string table in Keys)
            {
                DataTable dt = ParseTable(table);
                if (dt == null)
                {
                    continue;
                }
                ds.Tables.Add();
            }
            return ds;
        }
        /// <summary>
        /// 테이블 변환
        /// </summary>
        /// <returns></returns>
        public DataTable ParseTable(string tableName = "OUT_CUR0")
        {
            DataTable dt = new DataTable(tableName);
            if (Count < 1)
            {
                return dt;
            }


            // 테이블 스키마 생성
            foreach (TColumn col in this[tableName])
            {
                dt.Columns.Add(col.MakeColumn());
            }

            // 데이터 변환
            foreach (Dictionary<string, object> row in Parse(tableName))
            {
                DataRow dr = dt.NewRow();

                foreach (string columnId in row.Keys)
                {
                    dr[columnId] = row[columnId];
                }
                dt.Rows.Add(dr);
            }

            // 테이블 행 상태 변경
            dt.AcceptChanges();
            return dt;
        }

    }
}
