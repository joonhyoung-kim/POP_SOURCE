using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace SmartMom_Lib
{
    public static class clsXML
    {
        public static string directory = @"C:\SMARTMOM";
        public static string filePath = directory + @"\POPconfig.xml";

        // <summary>
        /// XML 생성
        /// </summary>
        public static void CreateXML()
        {
            if (!File.Exists(filePath))
            {
                DirectoryInfo di = new DirectoryInfo(directory);
                di.Create();

                DataTable dataTable = new DataTable();
                

                // 생성할 XML 파일 경로와 이름, 인코딩 방식을 설정합니다.
                XmlTextWriter textWriter = new XmlTextWriter(filePath, Encoding.UTF8);


                // 들여쓰기 설정
                textWriter.Formatting = System.Xml.Formatting.Indented;


                // 문서에 쓰기를 시작합니다.
                textWriter.WriteStartDocument();

                // 루트 설정
                textWriter.WriteStartElement("SMARTPOP");

                // 노드와 값 설정
                textWriter.WriteStartElement("MENU");
                textWriter.WriteString("Mat. Receiving");
                textWriter.WriteEndElement();

                // 노드 안에 하위 노드 설정
                textWriter.WriteStartElement("LINEINFO");

                //1. 자재입고
                textWriter.WriteStartElement("GR");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //GR END

                //2. 원자재불출
                textWriter.WriteStartElement("GI");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //GI END

                //3. 간판분할
                textWriter.WriteStartElement("SPLIT");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //SPLIT END

                //4. 재고이동/공정이동
                textWriter.WriteStartElement("MOVE");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //SPLIT END

                //5. 라벨발행
                textWriter.WriteStartElement("MANUAL");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //MANUAL END

                //6. 출하처리
                textWriter.WriteStartElement("SHIPMENT");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //SHIPMENT END

                //7.간판소진
                textWriter.WriteStartElement("GANBANUSE");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //GANBANUSE END


                //8.간판소진취소
                textWriter.WriteStartElement("USECANCEL");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //USECANCEL END


                //9. 자재투입
                textWriter.WriteStartElement("MATINPUT");

                textWriter.WriteStartElement("FROM");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("FROMDESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TO");
                textWriter.WriteString("");
                textWriter.WriteEndElement();
                textWriter.WriteStartElement("TODESC");
                textWriter.WriteString("");
                textWriter.WriteEndElement();

                textWriter.WriteEndElement(); //MATINPUT END


                textWriter.WriteEndElement(); //LINEINFO END

                textWriter.WriteEndElement(); //SMARTPOP END

                textWriter.WriteEndDocument();

                textWriter.Close();
            }
        }

        /// <summary>
        /// XML 파일 읽기
        /// </summary>
        public static DataTable ReadXML()
        {
            CreateXML();

            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("MENU_ID");
            dataTable.Columns.Add("FROMLINE");
            dataTable.Columns.Add("FROMDESC");
            dataTable.Columns.Add("TOLINE");
            dataTable.Columns.Add("TODESC");

            try
            {

                XmlDocument xmldoc = new XmlDocument();
                xmldoc.Load(filePath);
                XmlElement root = xmldoc.DocumentElement;

                // 노드 요소들
                XmlNodeList nodes = root.ChildNodes;

                string menuId = "";
                string fromLine = "";
                string fromDesc = "";
                string toLine = "";
                string toDesc = "";

                // 노드 요소의 값을 읽어 옵니다.
                foreach (XmlNode node in nodes)
                {
                    if ("MENU".Equals(node.Name))
                    {
                        menuId = node.InnerText.Trim();
                    }
                    else
                    {
                        foreach (XmlNode child in node.ChildNodes)
                        {
                            if (menuId.Equals("Mat. Receiving") && "GR".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Mat. Release") && "GI".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Label Split") && "SPLIT".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Move/Return") && "MOVE".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Label Issue") && "MANUAL".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Shipment") && "SHIPMENT".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Label Exhaust") && "GANBANUSE".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Exhaust Cancel") && "USECANCEL".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            else if (menuId.Equals("Mat. Input") && "MATINPUT".Equals(child.Name))
                            {
                                fromLine = child["FROM"].InnerText;
                                fromDesc = child["FROMDESC"].InnerText;
                                toLine = child["TO"].InnerText;
                                toDesc = child["TODESC"].InnerText;
                            }
                            
                        }
                    }
                }

                dataTable.Rows.Add(menuId, fromLine, fromDesc, toLine, toDesc);

            }
            catch (IOException ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return dataTable;
        }


        public static void UpdateXML(string type)
        {
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.Load(filePath);

            if (type == "MENU")
            {
                XmlNode FristNode = xmldoc.DocumentElement;
                XmlElement SubNode = (XmlElement)FristNode.SelectSingleNode("MENU");

                SubNode.InnerText = clsStatic._WMSMENU;

                FristNode.ReplaceChild(SubNode, SubNode);
                xmldoc.Save(filePath);
            }
            else if (type == "LINE")
            {
                XmlElement root = xmldoc.DocumentElement;

                // 노드 요소들
                XmlNodeList nodes = root.ChildNodes;
                XmlElement SubNode = null;

                // 노드 요소의 값을 읽어 옵니다.
                foreach (XmlNode node in nodes)
                {
                    try
                    {
                        if ("LINEINFO".Equals(node.Name))
                        {
                            if (clsStatic._WMSMENU == "Mat. Receiving")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("GR");
                            }
                            else if (clsStatic._WMSMENU == "Mat. Release")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("GI");
                            }
                            else if (clsStatic._WMSMENU == "Label Split")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("SPLIT");
                            }
                            else if (clsStatic._WMSMENU == "Move/Return")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("MOVE");
                            }
                            else if (clsStatic._WMSMENU == "Label Issue")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("MANUAL");
                            }
                            else if (clsStatic._WMSMENU == "Shipment")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("SHIPMENT");
                            }
                            else if (clsStatic._WMSMENU == "Label Exhaust")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("GANBANUSE");
                            }
                            else if (clsStatic._WMSMENU == "Exhaust Cancel")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("USECANCEL");
                            }
                            else if (clsStatic._WMSMENU == "Mat. Input")
                            {
                                SubNode = (XmlElement)node.SelectSingleNode("MATINPUT");
                            }

                            foreach (XmlNode childNode in SubNode.ChildNodes)
                            {
                                if (childNode.Name == "FROM")
                                {
                                    childNode.InnerText = clsStatic._FROMLINE;
                                }
                                else if (childNode.Name == "FROMDESC")
                                {
                                    childNode.InnerText = clsStatic._FROMLINE_DESC;
                                }
                                else if (childNode.Name == "TO")
                                {
                                    if (clsStatic._WMSMENU == "Mat. Input")
                                    {
                                        childNode.InnerText = clsStatic._RESOURCE_CD;
                                    }
                                    else
                                    {
                                        childNode.InnerText = clsStatic._TOLINE;
                                    }                                    
                                }
                                else if (childNode.Name == "TODESC")
                                {
                                    if (clsStatic._WMSMENU == "Mat. Input")
                                    {
                                        childNode.InnerText = clsStatic._RESOURCE_TEXT;
                                    }
                                    else
                                    {
                                        childNode.InnerText = clsStatic._TOLINE_DESC;
                                    }
                                    
                                }
                            }

                            node.ReplaceChild(SubNode, SubNode);
                            xmldoc.Save(filePath);
                        }
                    }
                    catch(Exception e)
                    {

                    }
                }


            }
        }
    }

}
