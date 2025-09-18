import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

export type PrismaModel = keyof Omit<
  PrismaClient,
  | '$connect'
  | '$disconnect'
  | '$on'
  | '$transaction'
  | '$use'
  | '$executeRaw'
  | '$queryRaw'
>;

type PrismaAction =
  | 'findUnique'
  | 'findFirst'
  | 'findMany'
  | 'create'
  | 'createMany'
  | 'update'
  | 'updateMany'
  | 'delete'
  | 'deleteMany'
  | 'count';

type PrismaArgs = {
  where?: Record<string, any>;
  data?: Record<string, any>;
  [key: string]: any;
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly cls: ClsService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  private getContext(keys: string[]) {
    const context = keys.reduce(
      (acc, key) => {
        const value = this.cls.get<string>(key);
        if (!value) throw new Error(`${key} not found in context`);
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );
    return context;
  }

  private getModelInstance<T>(model: PrismaModel, action: PrismaAction) {
    const instance = this[model] as unknown as {
      [key in PrismaAction]: (args: PrismaArgs) => Promise<T>;
    };
    if (!(action in instance) || typeof instance[action] !== 'function') {
      throw new Error(`Invalid action "${action}" on model`);
    }
    return instance;
  }

  private applyTenantConditions(
    args: PrismaArgs,
    action: PrismaAction,
    tenantId: string,
    userId?: string,
    connectRelation?: boolean,
  ): PrismaArgs {
    const modifyWhere = [
      'findMany',
      'findFirst',
      'findUnique',
      'updateMany',
      'deleteMany',
      'update',
      'delete',
      'count',
    ].includes(action);

    const modifyData = [
      'create',
      'createMany',
      'update',
      'updateMany',
    ].includes(action);

    const updatedArgs = { ...args };

    if (modifyWhere) {
      updatedArgs.where = {
        ...args.where,
        tenant_id: !connectRelation ? tenantId : undefined,
        ...(connectRelation
          ? {
              tenant: {
                connect: { id: tenantId },
              },
            }
          : {}),
      };
    }

    if (modifyData) {
      updatedArgs.data = {
        ...args.data,
        ...(connectRelation
          ? {
              tenant: {
                connect: { id: tenantId },
              },
            }
          : {
              tenant_id: tenantId,
            }),
        ...(userId &&
          ['create', 'createMany'].includes(action) && {
            creator_user_id: userId,
          }),
        ...(userId &&
          ['update', 'updateMany'].includes(action) && {
            updater_user_id: userId,
          }),
      };
    }

    return updatedArgs;
  }

  async tenantQuery<T>(
    model: PrismaModel,
    action: PrismaAction,
    args: PrismaArgs = {},
  ): Promise<T> {
    const { tenantId } = this.getContext(['tenantId']);
    const modelInstance = this.getModelInstance<T>(model, action);
    const modifiedArgs = this.applyTenantConditions(args, action, tenantId);
    return modelInstance[action](modifiedArgs);
  }

  async tenantAndAuditoryQuery<T>(
    model: PrismaModel,
    action: PrismaAction,
    args: PrismaArgs = {},
  ): Promise<T> {
    const { tenantId, userId } = this.getContext(['tenantId', 'userId']);
    const modelInstance = this.getModelInstance<T>(model, action);
    const modifiedArgs = this.applyTenantConditions(
      args,
      action,
      tenantId,
      userId,
    );
    return modelInstance[action](modifiedArgs);
  }

  async connectTenantQuery<T>(
    model: PrismaModel,
    action: PrismaAction,
    args: PrismaArgs = {},
  ): Promise<T> {
    const { tenantId } = this.getContext(['tenantId']);
    const modelInstance = this.getModelInstance<T>(model, action);
    const modifiedArgs = this.applyTenantConditions(
      args,
      action,
      tenantId,
      undefined,
      true,
    );
    return modelInstance[action](modifiedArgs);
  }
}
