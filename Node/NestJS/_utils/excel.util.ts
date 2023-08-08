import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import * as crypto from 'crypto';
import { range } from 'rxjs';

export const getRandomFileName = () => {
    return crypto.randomUUID();
}

export const existInternalFile = (path: string): boolean => {
  try {
    return fs.existsSync(path);
  } catch(err) {
    console.error(err);
    throw new Error(err.message);
  }
}
  /*
      uuid: un identificador único para la orden de compra
      id: el ID de la orden de compra
      date_created: la fecha en que se creó la orden de compra
      date_delivery: la fecha en que se espera que se entregue el pedido
      notes: notas adicionales relacionadas con el pedido
      company: el identificador único de la empresa que realizó el pedido
      payment_type: el tipo de pago del pedido
      address_delivery: la dirección de entrega del pedido
      purchase_order: el número de orden de compra
      checked: una bandera que indica si el pedido ha sido verificado
      state: un objeto que contiene el estado actual de la orden, con propiedades codyname
      ordersDetail: una matriz que contiene objetos que describen los detalles de los productos pedidos. Cada objeto tiene las siguientes propiedades:
          uuid: un identificador único para el pedido del producto
          type_quantity: el tipo de cantidad pedida (por ejemplo, metros, kilogramos)
          price: el precio por unidad del producto
          quantity: el número de unidades pedidas
          productPrice: un objeto que contiene información sobre el precio del producto, con propiedades price_mt, price_kg, uuidyclient
          color: un objeto que contiene información sobre el color del producto, con propiedades uuid, cod, descriptionycompany
  
  [{>>"uuid":"ec25eb9b-d090-49f9-b567-62294d277b8e",
  "id":"200015","date_created":"2022-06-28T17:00:00.000Z","date_delivery":null,"notes":"Importante el precio de mi lista para el 7115 es de $222 y el 7338 es de $ 264 favor corregir","company":"51e4d291-e408-4c77-88fd-ec06b8697297","payment_type":"CRED","address_delivery":"CRA 67 A No 9 - 83","purchase_order":"3021","checked":1,"state":{"cod":"PEND","name":"Pending"},
  "ordersDetail":[{">>uuid":"ebab7399-9abf-4a97-8045-b7dddaa99ddf",
                  "type_quantity":"MTS",
                  "price":"242.88",
                  "quantity":2000,
                  "productPrice":{"price_mt":"264",
                                  "price_kg":"0",
                                  "uuid":"bf1fc13f-7718-4389-be03-2c61c278634a",
                                  "client":{"uuid":"1a9ca775-c127-488e-97d3-54843e785a35",
                                            "address":"CRA 67 A No 9 - 83",
                                            "name":"MANUFACTURAS UVA S.A.S.",
                                            "identification":"900344294",
                                            "cod":"MAN0034",
                                            "company":"51e4d291-e408-4c77-88fd-ec06b8697297",
                                            "state":"ACTI",
                                            "email_market":"manufacturasuva.sas@hotmail.com",
                                            "email_account":"manufacturasuva.sas@hotmail.com",
                                            "email_invoice":"manufacturasuva.sas@hotmail.com",
                                            "seller":{"uuid":"TO04",
                                                      "seller_cod":"TO04",
                                                      "full_name":"TORRES NEFTALI -4-",
                                                      "login":"to04",
                                                      "state":{"cod":"ACTI",
                                                               "name":"Active"},
                                                      "rol":{"cod":"SELL",
                                                             "name":"Seller"},
                                                      "company":{"uuid":"51e4d291-e408-4c77-88fd-ec06b8697297",
                                                                 "name":"Cintalast SAS",
                                                                 "nit":"860072810-8",
                                                                 "id_order":1470}
                                                      },
                                            "city":{"cod":"BOGO",
                                                    "name":"BOGOTA",
                                                    "department":{"cod":"COLO",
                                                                  "name":"COLOMBIA"}
                                                    }
                                            },
                                  "product":{"uuid":"388aa397-ad4f-4a8f-80cf-ce874110520d",
                                                       "description":"",
                                                       >>>"ref":"7338",
                                                       "price_mt":"331.0",
                                                       "price_kg":"0",
                                                       "company":"51e4d291-e408-4c77-88fd-ec06b8697297"
                                            }
                                },
                    "color":{"uuid":"19f4df00-999c-41ea-b08d-ca0aa4121aef",
                             >>>"cod":"700",
                             "description":"NEGRO",
                             "company":"51e4d291-e408-4c77-88fd-ec06b8697297"
                            }
                   },
                   {"uuid":"e9a3a816-0432-4c6f-a0aa-1a03d8e070e6",
                   "type_quantity":"MTS",
                   "price":"204.24",
                   >>> "quantity":5000,
                   "productPrice":{"price_mt":"222",
                                   "price_kg":"0",
                                   "uuid":"71ca537b-7233-48dd-b91d-59f5e8a8899c",
                                   "client":{"uuid":"1a9ca775-c127-488e-97d3-54843e785a35",
                                             "address":"CRA 67 A No 9 - 83",
                                             "name":"MANUFACTURAS UVA S.A.S.",
                                             "identification":"900344294",
                                             "cod":"MAN0034",
                                             "company":"51e4d291-e408-4c77-88fd-ec06b8697297",
                                             "state":"ACTI",
                                             "email_market":"manufacturasuva.sas@hotmail.com",
                                             "email_account":"manufacturasuva.sas@hotmail.com",
                                             "email_invoice":"manufacturasuva.sas@hotmail.com",
                                             "seller":{"uuid":"TO04",
                                                       "seller_cod":"TO04",
                                                       "full_name":"TORRES NEFTALI -4-",
                                                       "login":"to04",
                                                       "state":{"cod":"ACTI",
                                                                "name":"Active"},
                                                       "rol":{"cod":"SELL",
                                                              "name":"Seller"},
                                                       "company":{"uuid":"51e4d291-e408-4c77-88fd-ec06b8697297",
                                                                  "name":"Cintalast SAS",
                                                                  "nit":"860072810-8",
                                                                  "id_order":1470}},
                                              "city":{"cod":"BOGO",
                                                      "name":"BOGOTA",
                                                      "department":{"cod":"COLO",
                                                                    "name":"COLOMBIA"}}},
                                    "product":{"uuid":"47bf8f4c-6cc2-4e78-9695-023ea58064a7",
                                               "description":"",
                                               "ref":"71715",
                                               "price_mt":"333.0",
                                               "price_kg":"0",
                                               "company":"51e4d291-e408-4c77-88fd-ec06b8697297"}},
                    "color":{"uuid":"19f4df00-999c-41ea-b08d-ca0aa4121aef",
                             "cod":"700",
                             "description":"NEGRO",
                             "company":"51e4d291-e408-4c77-88fd-ec06b8697297"}}]}] */
export const writeInternalFile = (pathFile: string, fileName: string, jsonContent: string) => {
  try {                             
      const jsonData = JSON.parse(jsonContent);
      const cantProd_order=[];
      let i=0
      for (i; i < jsonData.length ; i++)
      {
        cantProd_order.push(jsonData[i].ordersDetail.length);
      }
      const excelData = [];
      i=0;  
      //crear los encabezados de las columnas
      excelData.push(['NOM CLIENTE','REF-PRODUCTO','COLOR','QUANTITY','POS']);
      let z=0;
      for (i;i<cantProd_order.length;i++)
      {
        let j=0;          
        for(j;j<cantProd_order[i];j++)
        {
          excelData.push([jsonData[i].ordersDetail[j].productPrice.client.name,jsonData[i].ordersDetail[j].productPrice.product.ref,jsonData[i].ordersDetail[j].color.cod,jsonData[i].ordersDetail[j].quantity,i+"-"+j]);
        }
      }
      
        // Crear Excel y una hoja de cálculo
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.aoa_to_sheet(excelData);

      // Agregar la hoja de cálculo al libro de trabajo
      xlsx.utils.book_append_sheet(wb, ws, 'HT- Ordenes');
                              
      // Escribir el libro de trabajo en un archivo
      const buffer = xlsx.write(wb, { type: 'buffer' });
      fs.writeFileSync(path.join(pathFile, fileName), buffer);
        
      } catch(err) {
      console.log(err.message);
      throw new Error(err.message);
      }
  }

export const readBase64InternalFile = (pathFile: string, fileName: string) : string => {
  try {
    return fs.readFileSync(path.join(pathFile, fileName), {encoding: 'base64'});
  } catch(err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export const deleteInternalFile = (pathFile: string, fileName: string) => {
  try {
    fs.unlinkSync(path.join(pathFile, fileName))
  } catch(err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}


